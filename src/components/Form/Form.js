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
  const { idb, allJobs, editJob, setEditJob, getAllData, editSelected } =
    useContext(AppContext);
  const handleSubmit = async (event) => {
    const dbPromise = await idb.open("db", 1);

    if (title && description && value) {
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;

        var tx = db.transaction("jobsList", "readwrite");
        var jobsList = tx.objectStore("jobsList");

        // console.log(addUser, editUser);
        // console.log(addUser, editUser);

        const users = jobsList.put({
          id: allJobs.length + 1,
          title,
          description,
          value,
        });

        console.log("add");
        users.onsuccess = (query) => {
          // setTotalJobs((prev) => prev + 1);
          tx.oncomplete = function () {
            db.close();
          };
          alert("User added!");
          setTitle("");
          setDescription("");
          window.location.reload();
          // getAllData();
          // event.preventDefault();
        };
        if (editJob) {
          console.log(editSelected);

          const users = jobsList.put({
            id: editSelected?.id,
            title,
            description,
            value,
          });
          console.log("edit");

          users.onsuccess = (query) => {
            tx.oncomplete = function () {
              db.close();
            };
            alert("Job updated!");
            setTitle("");
            setDescription("");
            setEditJob(false);
            getAllData();
            // setSelectedUser({});
            event.preventDefault();
          };
        }
      };
    } else {
      alert("Please enter all details");
    }
  };
  useEffect(() => {
    let { title, description } = editSelected;
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

        <DateRangePicker onChange={onChange} value={value} />

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Paper>
    </div>
  );
}
