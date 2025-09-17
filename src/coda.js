// Node.js-only: Save Coda data to local file for production use
// Usage: node src/coda.js

// src/coda.js

import { Coda } from "coda-js";
import codaConfigRaw from "./coda_config.json" with { type: "json" };

// Support both ESM and CJS import of config
const codaConfig = codaConfigRaw.default || codaConfigRaw;
const CODA_API_KEY = codaConfig.CODA_API_KEY;
const DOC_ID = codaConfig.DOC_ID;
const TABLE_IDS = codaConfig.TABLE_IDS;
const USE_LOCAL_DATA = codaConfig.USE_LOCAL_DATA;

const coda = new Coda(CODA_API_KEY);

export async function fetchAllTables() {
    if (USE_LOCAL_DATA) {
        // Load local JSON file from public folder using fetch (frontend)
        const res = await fetch("/coda_data.json");
        if (!res.ok) throw new Error("Could not load local Coda data");
        return await res.json();
    } else {
        // Fetch from Coda (no file write in frontend)
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
        return result;
    }
}
