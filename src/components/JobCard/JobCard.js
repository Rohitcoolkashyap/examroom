import React, { useContext, useState } from "react";
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

  const [ellipseText, setEllipseText] = useState(true);

  const jobCardDescription = () => {
    if (ellipseText) {
      return {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 2,
        maxHeight: "48px",
      };
    } else {
      return null;
    }
  };
  return (
    <Paper elevation={1} className="jobCard">
      <div className="jobCard-details">
        <h1>{title}</h1>
        <p style={jobCardDescription()} onClick={() => setEllipseText(false)}>
          {description}
        </p>
      </div>
      <div className="jobCard-footer">
        <div className="jobCard-footer-date">
          <span>{dateFormat(date[0], "ddd, dS mmm, yyyy")}</span>
          <span style={{ textAlign: "center" }}>to</span>
          <span>{dateFormat(date[1], "ddd, dS mmm, yyyy")}</span>
        </div>
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
