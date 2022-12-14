import React from "react";
import { IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
export default function JobCard({ title, description, date }) {
  return (
    <Paper elevation={1} className="jobCard">
      <div className="jobCard-details">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="jobCard-footer">
        <h5>{date}</h5>

        <div className="jobCard-icons">
          <IconButton>
            <ModeEditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
}
