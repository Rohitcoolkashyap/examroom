import { Paper, TextField } from "@mui/material";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

import React, { useState } from "react";
import "./form.css";
export default function Form() {
  const [value, onChange] = useState([new Date(), new Date()]);

  return (
    <div>
      <h1 className="heading">Form</h1>

      <Paper elevation={1} className="form">
        <TextField id="outlined-required" label="Title" />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
        />

        <div>
          <DateRangePicker onChange={onChange} value={value} />
        </div>
      </Paper>
    </div>
  );
}
