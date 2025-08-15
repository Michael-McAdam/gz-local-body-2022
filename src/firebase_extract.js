// Script to extract all Firestore data and write to CSV files
// Usage: node src/firebase_extract.js

const fs = require("fs");
const path = require("path");
// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

const admin = require("firebase-admin");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const { v4: uuidv4 } = require("uuid");

const { levels } = require("util");
const { constants } = require("buffer");
const { find } = require("lodash");

// You must set GOOGLE_APPLICATION_CREDENTIALS env var to your Firebase service account key JSON
admin.initializeApp();

const db = admin.firestore();

async function fetchAllDocsRecursive(collectionPath, parent = null) {
    const docs = await db.collection(collectionPath).get();
    let allData = [];
    for (const doc of docs.docs) {
        const data = doc.data();
        data.id = doc.id;
        allData.push(data);
        // Recursively fetch subcollections
        const subcollections = await doc.ref.listCollections();
        for (const sub of subcollections) {
            const subPath = `${collectionPath}/${doc.id}/${sub.id}`;
            const subData = await fetchAllDocsRecursive(subPath, doc.id);
            allData = allData.concat(subData);
        }
    }
    return allData;
}

async function writeCsv(filename, rows) {
    if (!rows.length) return;
    const header = Object.keys(rows[0]).map((k) => ({ id: k, title: k }));
    const csvWriter = createCsvWriter({
        path: filename,
        header,
    });
    await csvWriter.writeRecords(rows);
}

async function main() {
    // List all top-level collections
    const collections = await db.listCollections();
    console.log(
        "Collections:",
        collections.map((c) => c.id)
    );
    for (const col of collections) {
        const colName = col.id;
        console.log(`Fetching data from collection: ${colName}`);
        const data = await fetchAllDocsRecursive(colName);
        if (data.length) {
            const outPath = path.join(__dirname, `${colName}.csv`);
            await writeCsv(outPath, data);
            console.log(`Wrote ${data.length} rows to ${outPath}`);
        }
    }
    console.log("Done!");
}

// main().catch((e) => {
//     console.error(e);
//     process.exit(1);
// });

async function test() {
    const { levels } = require("./util");
    let flat = [];
    let idMap = {};

    async function getAllNestedDocs(levelIdx, parentPath, parentId) {
        const level = levels[levelIdx];
        if (!level) return;
        let collectionPath = parentPath
            ? `${parentPath}/${level}s`
            : `${level}s`;
        const snapshot = await db.collection(collectionPath).get();
        for (const doc of snapshot.docs) {
            const docData = doc.data();
            delete docData._updatedBy;
            delete docData._createdBy;
            const thisId = doc.id;
            const thisName = docData.name || null;
            // Generate a unique UUID for this entry
            const uniqueId = uuidv4();
            idMap[`${collectionPath}/${thisId}`] = uniqueId;
            let childrenUuids = [];
            if (levels[levelIdx + 1]) {
                // Get child docs and collect their uuids
                const childLevel = levels[levelIdx + 1];
                const childPath = `${collectionPath}/${thisId}/${childLevel}s`;
                const childSnap = await db.collection(childPath).get();
                childrenUuids = childSnap.docs.map((childDoc) => {
                    const childFirestorePath = `${childPath}/${childDoc.id}`;
                    // Generate UUID for child if not already assigned
                    if (!idMap[childFirestorePath]) {
                        idMap[childFirestorePath] = uuidv4();
                    }
                    return idMap[childFirestorePath];
                });
                // Recursively flatten children
                await getAllNestedDocs(
                    levelIdx + 1,
                    `${collectionPath}/${thisId}`,
                    uniqueId
                );
            }
            flat.push({
                uuid: uniqueId,
                level,
                id: thisId,
                name: thisName,
                parent: parentId || null,
                children: childrenUuids,
                ...docData,
                path: collectionPath + "/" + thisId,
            });
        }
    }

    await getAllNestedDocs(0, "", null);
    // Collect all unique keys for CSV header
    const allKeys = new Set();
    flat.forEach((obj) => Object.keys(obj).forEach((k) => allKeys.add(k)));
    const header = Array.from(allKeys).map((k) => ({ id: k, title: k }));
    // Convert children array to string for CSV compatibility
    const flatForCsv = flat.map((obj) => ({
        ...obj,
        children: Array.isArray(obj.children) ? obj.children.join("|") : "",
    }));
    // Write CSV with full header
    const csvWriter = createCsvWriter({
        path: path.join(__dirname, "all_levels_flat_2.csv"),
        header,
    });
    await csvWriter.writeRecords(flatForCsv);
    // Write JSON output
    fs.writeFileSync(
        path.join(__dirname, "all_levels_flat_2.json"),
        JSON.stringify(flat, null, 2)
    );
    console.log("Wrote all_levels_flat.csv and all_levels_flat_2.json");
    console.dir(flat, { depth: null });
}

async function find_docs(path) {
    // Use firebase-admin Firestore API for querying
    const snapshot = await db.collection(path).get();
    return snapshot.docs.map((doc) => {
        const docData = doc.data();
        delete docData._updatedBy;
        delete docData._createdBy;
        return { id: doc.id, ...docData };
    });
}

async function find_all_regions() {
    for (let i = 0; i < levels.length; i++) {
        const level = levels[i];
        const q = query(collection(db, level));
        const res = await getDocs(q);
        const locs = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(level, locs);
    }
}

find_docs("regions");

test();

let clickHandler = async (state, dispatch, index, db, id) => {
    const level = levels[index];

    // Clear selected state and data below the current level
    let selected = state.selected;
    let data = state.data;
    for (let k = levels.length; k > index; k--) {
        selected[levels[k]] = "";
        data[levels[k]] = [];
    }
    selected[level] = id;

    //Update state
    dispatch({
        type: "setSelected",
        payload: { selected, data },
    });

    // Figure out path based on new state
    let path = "";
    for (let j = 0; j <= index; j++) {
        path += `/${order[j]}s/${selected[order[j]]}`;
    }
    path += `/${order[index + 1]}s`;

    console.log("Path", path);

    // Request new data
    let q = query(collection(db, path), where("include", "==", true));
    let res = await getDocs(q);
    let locs = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch({
        type: "addData",
        payload: {
            type: order[index + 1],
            data: locs,
        },
    });

    // If only one option, select it
    if (locs.length == 1) {
        await clickHandler(
            { ...state, data: { ...state.data, [order[index + 1]]: locs } },
            dispatch,
            index + 1,
            db,
            locs[0].id
        );
    } else if (locs.length == 0) {
        // If no options, assume we are at the bottom and scroll to next section
        recordRegionSelected(state.data, state.selected);
        scroller.scrollTo("who", { smooth: true });
    }
};
