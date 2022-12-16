import React, { useContext } from "react";
import JobCard from "../components/JobCard/JobCard";
import { AppContext } from "../App";

export default function ListJobs() {
  const { idb, allJobs, getAllData, setSelectedJob } = useContext(AppContext);

  const deleteSelected = (job) => {
    const dbPromise = idb.open("db", 1);

    dbPromise.onsuccess = function () {
      const db = dbPromise.result;

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
        {allJobs && allJobs?.length != 0 ? (
          allJobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              description={job.description}
              date={job.date}
              editSelected={() => setSelectedJob(job)}
              deleteSelected={() => deleteSelected(job)}
            />
          ))
        ) : (
          <div className="listJobs-empty">Empty!!</div>
        )}
      </div>
    </div>
  );
}
