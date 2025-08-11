// Usage: node src/coda_saver.mjs
import { Coda } from "coda-js";
import fs from "fs";
import path from "path";
import { CODA_API_KEY, DOC_ID, TABLE_IDS } from "./coda.js";

const coda = new Coda(CODA_API_KEY);
const LOCAL_DATA_PATH = path.resolve("./public/coda_data.json");

async function saveCodaDataToFile() {
  const doc = await coda.getDoc(DOC_ID);
  const result = {};
  for (const [key, tableId] of Object.entries(TABLE_IDS)) {
    const table = await coda.getTable(DOC_ID, tableId);
    const rows = await table.listRows({ useColumnNames: true });
    result[key] = rows.map((row) => ({ id: row.id, ...row.values }));
  }
  fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(result, null, 2), "utf-8");
  console.log(`Coda data saved to ${LOCAL_DATA_PATH}`);
  return result;
}

saveCodaDataToFile();
