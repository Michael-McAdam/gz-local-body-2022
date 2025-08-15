import { useEffect } from "react";
import { fetchAllTables } from "./coda";
import { useStore } from "./state";
import { set } from "lodash";

function DataConnect() {
  const setCodaData = useStore((state) => state.setCodaData);
  const setLoaded = useStore((state) => state.setLoaded);
  // Add other setters as needed for other tables

  useEffect(() => {
    fetchAllTables()
      .then((data) => {
        // Example: if data.region and data.where are returned
        setCodaData(data);
        setLoaded(true);
        // Add more as needed
      })
      .catch((error) => {
        console.error("Error fetching Coda data:", error);
      });
  }, [setCodaData]);
  return null;
}

export default DataConnect;
