import React, { useContext } from "react";
import "./jobCard.css";
import { IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { AppContext } from "../../App";
export default function JobCard({
  title,
  description,
  date,
  deleteSelected,
  editSelected,
}) {
  const { setEditJob } = useContext(AppContext);

  return (
    <Paper elevation={1} className="jobCard">
      <div className="jobCard-details">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="jobCard-footer">
        <h5>{date}</h5>

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
