import React, { useContext } from "react";
import "./jobCard.css";
import { IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { AppContext } from "../../App";
import dateFormat, { masks } from "dateformat";

export default function JobCard({
  title,
  description,
  date,
  deleteSelected,
  editSelected,
}) {
  const { setEditJob } = useContext(AppContext);
  console.log(date);
  console.log(dateFormat(date[0], "dddd, dS mmmm, yyyy"));

  return (
    <Paper elevation={1} className="jobCard">
      <div className="jobCard-details">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="jobCard-footer">
        <span>{dateFormat(date[0], "ddd, dS mmmm, yyyy")}</span>
        <span>to</span>
        <span>{dateFormat(date[1], "ddd, dS mmmm, yyyy")}</span>

        <div className="jobCard-icons">
          <IconButton
            onClick={() => {
              setEditJob(true);
              editSelected();
            }}
          >
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={deleteSelected} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
}
