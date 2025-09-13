// Usage: node src/coda_saver.mjs
import { Coda } from "coda-js";
import fs from "fs";
import path from "path";
// Attempt named import first; fallback to default export if Node treats coda.js as CommonJS
import * as codaModule from "./coda.js";
const { CODA_API_KEY, DOC_ID, TABLE_IDS } = codaModule.CODA_API_KEY
    ? codaModule
    : codaModule.default;

import readline from "readline";

const coda = new Coda(CODA_API_KEY);
const LOCAL_DATA_PATH = path.resolve("./public/coda_data.json");

async function saveCodaDataToFile() {
    const doc = await coda.getDoc(DOC_ID);
    const result = {};
    for (const [key, tableId] of Object.entries(TABLE_IDS)) {
        const table = await coda.getTable(DOC_ID, tableId);
        let allRows = [];
        let nextPageToken = null;
        let response = null;

        do {
            response = await table.listRowsPaginatedByToken({
                useColumnNames: true,
                limit: 500, // Max allowed per request
                sortBy: "natural",
                pageToken: nextPageToken,
            });

            allRows = allRows.concat(response.items || []);
            nextPageToken = response.token;
        } while (response?.token !== undefined);

        result[key] = allRows.map((row) => ({ id: row.id, ...row.values }));
    }
    fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(result, null, 2), "utf-8");
    console.log(`Coda data saved to ${LOCAL_DATA_PATH}`);
    return result;
}

async function listTables() {
    const tables = await coda.listTables(DOC_ID);
    return tables.map((table) => ({
        id: table.id,
        name: table.name,
        type: table.type,
    }));
}

const optionsTable = [
    { key: "s", fn: saveCodaDataToFile, desc: "Save Coda data to file" },
    { key: "l", fn: listTables, desc: "List tables" },
    { key: "q", fn: null, desc: "Quit" },
];

function printOptions() {
    console.log("\nCoda Saver Options:");
    optionsTable.forEach((opt) => {
        console.log(`[${opt.key}] ${opt.desc}`);
    });
}

async function main() {
    printOptions();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on("line", async (input) => {
        const cmd = input.trim().toLowerCase();
        const opt = optionsTable.find((o) => o.key === cmd);
        if (opt) {
            if (opt.key === "q") {
                rl.close();
                process.exit(0);
            } else {
                const result = await opt.fn();
                if (opt.key === "l" && result) {
                    console.log("Tables:", result);
                }
                printOptions();
            }
        } else {
            console.log("Unknown command.");
            printOptions();
        }
    });
}

main();
