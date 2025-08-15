// src/coda.js
// Utility for fetching data from Coda.io API
// You must set CODA_API_KEY, DOC_ID, and TABLE_IDS in your environment or config

import { Coda } from "coda-js";

// const { Coda } = require("coda-js");

// const CODA_API_KEY = process.env.REACT_APP_CODA_API_KEY;
// const DOC_ID = process.env.REACT_APP_CODA_DOC_ID;

const CODA_API_KEY = "223c179a-f261-445d-b834-4d4988316ab0";
const DOC_ID = "Ri0MBzNucp";

const coda = new Coda(CODA_API_KEY);

// Example: { region: 'grid-xxxx', district: 'grid-yyyy', ... }
export const TABLE_IDS = {
  region: "grid-rLUKjzmK_o",
  candidates: "grid-06lP-Bmo3f",
  candidate_types: "grid-5PaDvUpsgX",
};

// const BASE_URL = `https://coda.io/apis/v1/docs/${DOC_ID}/tables`;

// export async function fetchCodaRows(level, parentId = null) {
//     const tableId = TABLE_IDS[level];
//     if (!tableId) throw new Error(`No table ID for level: ${level}`);

//     let url = `${BASE_URL}/${tableId}/rows`;
//     let params = [];
//     // Filter for 'include' and parentId if provided
//     params.push("query=Include:true");
//     if (parentId) params.push(`query=ParentId:${parentId}`);
//     if (params.length) url += "?" + params.join("&");

//     const res = await fetch(url, {
//         headers: {
//             Authorization: `Bearer ${CODA_API_KEY}`,
//         },
//     });
//     if (!res.ok) throw new Error("Coda API error");
//     const data = await res.json();
//     // Map Coda row format to { id, ...fields }
//     return data.items.map((row) => ({
//         id: row.id,
//         ...row.values,
//     }));
// }

// console.log(fetchCodaRows("location"));

// Fetch all table data as { tableId: [rows] }

export async function fetchAllTables() {
  const doc = await coda.getDoc(DOC_ID);
  const result = {};
  for (const [key, tableId] of Object.entries(TABLE_IDS)) {
    const table = await coda.getTable(DOC_ID, tableId);
    const rows = await table.listRows({ useColumnNames: true });
    result[key] = rows.map((row) => ({ id: row.id, ...row.values }));
  }
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

const tables = await listTables();
console.log("Coda Tables:", tables);
