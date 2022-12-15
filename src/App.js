import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import LandingPage from "./pages/LandingPage";
import theme from "./util/theme";
import { ThemeProvider } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import JOBS_LIST from "./data/jobsList";

export const AppContext = createContext(null);

// import jobsList from "../data/jobsList";

const idb = window.indexedDB;
// ||
// window.mozIndexedDB ||
// window.webkitIndexedDB ||
// window.msIndexedDB ||
// window.shimIndexedDB;

const initDb = () => {
  //check for support
  if (!idb) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  const request = idb.open("db", 1);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onupgradeneeded = function (event) {
    console.log(event);
    const db = request.result;

    if (!db.objectStoreNames.contains("jobsList")) {
      const objectStore = db.createObjectStore("jobsList", { keyPath: "id" });

      objectStore.createIndex("age", "age", {
        unique: false,
      });
    }
  };

  request.onsuccess = function () {
    console.log("Database opened successfully");

    const db = request.result;

    var tx = db.transaction("jobsList", "readwrite");
    var jobsList = tx.objectStore("jobsList");
    console.log(jobsList);
    JOBS_LIST.forEach((item) => jobsList.add(item));

    return tx.complete;
  };
};

function App() {
  // Initialize DB
  const [allJobs, setAllJobs] = useState();
  const [editJob, setEditJob] = useState(false);
  const [editSelected, setEditSelected] = useState({});

  useEffect(() => {
    initDb();
    getAllData();
  }, []);

  const getAllData = () => {
    const dbPromise = idb.open("db", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      var tx = db.transaction("jobsList", "readonly");
      var jobsList = tx.objectStore("jobsList");
      const users = jobsList.getAll();

      users.onsuccess = (query) => {
        setAllJobs(query.srcElement.result);
        // setTotalJobs(query.srcElement.result?.length);
      };

      tx.oncomplete = function () {
        db.close();
      };
    };
  };

  return (
    <AppContext.Provider
      value={{
        idb,
        allJobs,
        setAllJobs,
        getAllData,

        editJob,
        setEditJob,
        editSelected,
        setEditSelected,
      }}
    >
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
