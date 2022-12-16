import "./form.css";
import { Paper, TextField } from "@mui/material";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import Button from "@mui/material/Button";
export default function Form() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, onChange] = useState([new Date(), new Date()]);
  const {
    idb,
    allJobs,
    editJob,
    setEditJob,
    getAllData,
    selectedJob,
    setSelectedJob,
  } = useContext(AppContext);
  const handleSubmit = async (event) => {
    const dbPromise = await idb.open("db", 1);

    if (title && description && value) {
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;

        var tx = db.transaction("jobsList", "readwrite");
        var jobsList = tx.objectStore("jobsList");

        if (!editJob) {
          const users = jobsList.put({
            id: allJobs.length + 1,
            title,
            description,
            date: value,
          });

          users.onsuccess = (query) => {
            tx.oncomplete = function () {
              db.close();
            };
            alert("User added!");
            setTitle("");
            setDescription("");
            window.location.reload();
          };
        } else if (editJob) {
          const users = jobsList.put({
            id: selectedJob?.id,
            title,
            description,
            date: value,
          });

          users.onsuccess = (query) => {
            tx.oncomplete = function () {
              db.close();
            };
            alert("Job updated!");
            setTitle("");
            setDescription("");
            setEditJob(false);
            getAllData();
            setSelectedJob({});
            event.preventDefault();
          };
        }
      };
    } else {
      alert("Please enter all details");
    }
  };
  useEffect(() => {
    let { title, description } = selectedJob;
    if (editJob) {
      setTitle(title);
      setDescription(description);
    }
  }, [editJob]);
  return (
    <div>
      <h1 className="heading">Form</h1>

      <Paper elevation={1} className="form">
        <TextField
          id="outlined-required"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <DateRangePicker
          className="date-picker"
          onChange={onChange}
          value={value}
        />

        <Button
          style={{ backgroundColor: "#64748B" }}
          size="large"
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Paper>
    </div>
  );
}
