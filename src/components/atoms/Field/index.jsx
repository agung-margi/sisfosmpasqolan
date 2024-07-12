import React from "react";
import { TextField } from "@mui/material";

const FieldText = (props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id} className="ml-2">
        {props.label}
      </label>
      <TextField id={props.id} variant="outlined" placeholder={props.placeholder}/>
    </div>
  );
};

export default FieldText;
