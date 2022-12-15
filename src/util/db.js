// import jobsList from "../data/jobsList";

const idb = window.indexedDB;
// ||
// window.mozIndexedDB ||
// window.webkitIndexedDB ||
// window.msIndexedDB ||
// window.shimIndexedDB;

export const initDb = () => {
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
    jobsList.forEach((item) => jobsList.add(item));

    return tx.complete;
  };
  return idb;
};
