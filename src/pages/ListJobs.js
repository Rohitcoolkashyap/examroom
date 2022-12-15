import React, { useState, useContext, useEffect } from "react";
import JobCard from "../components/JobCard/JobCard";
import { AppContext } from "../App";

export default function ListJobs() {
  // const [allJobs, setAllJobs] = useState();
  const { idb, allJobs, getAllData, setEditSelected } = useContext(AppContext);

  // const getAllData = (idb) => {
  //   const dbPromise = idb.open("db", 3);
  //   dbPromise.onsuccess = () => {
  //     const db = dbPromise.result;

  //     var tx = db.transaction("jobsList", "readonly");
  //     var jobsList = tx.objectStore("jobsList");
  //     const users = jobsList.getAll();

  //     users.onsuccess = (query) => {
  //       setAllJobs(query.srcElement.result);
  //       setTotalJobs(query.srcElement.result?.length);
  //     };

  //     tx.oncomplete = function () {
  //       db.close();
  //     };
  //   };
  // };

  const deleteSelected = (job) => {
    console.log(job);
    const dbPromise = idb.open("db", 1);

    dbPromise.onsuccess = function () {
      const db = dbPromise.result;
      console.log(db);

      var tx = db.transaction("jobsList", "readwrite");
      var jobsList = tx.objectStore("jobsList");

      const deleteUser = jobsList.delete(job.id);

      deleteUser.onsuccess = (query) => {
        tx.oncomplete = function () {
          db.close();
        };
        alert("User deleted!");
        getAllData();
      };
    };
  };

  return (
    <div className="listJobs">
      <h1 className="heading">Active openings</h1>
      <div>
        {allJobs ? (
          allJobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              description={job.description}
              date={job.date}
              editSelected={() => setEditSelected(job)}
              deleteSelected={() => deleteSelected(job)}
            />
          ))
        ) : (
          <div>Empty!!</div>
        )}
      </div>
    </div>
  );
}
