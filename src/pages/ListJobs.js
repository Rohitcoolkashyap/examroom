import React from "react";
import jobsList from "../data/jobsList";
import JobCard from "./JobCard";
export default function ListJobs() {
  return (
    <div className="listJobs">
      <h1 className="heading">Active openings</h1>
      <div>
        {jobsList &&
          jobsList.map((job) => (
            <JobCard
              title={job.title}
              description={job.description}
              date={job.date}
            />
          ))}
      </div>
    </div>
  );
}
