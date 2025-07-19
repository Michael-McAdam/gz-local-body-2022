import { useEffect } from "react";
import { fetchAllTables } from "./coda";
import store from "./state";
import { connect } from "unistore/react";

const actions = {
  addCodaData: (state, data) => {
    // Merge Coda data into store.data
    return {
      ...state.data,
      ...data,
    };
  },
};

function DataConnect({ addCodaData }) {
  useEffect(() => {
    fetchAllTables()
      .then((data) => {
        addCodaData(data);
      })
      .catch((error) => {
        console.error("Error fetching Coda data:", error);
      });
  }, []);
  return null;
}

export default connect([], actions)(DataConnect);
