import React from "react";
import { TextField } from "@mui/material";

const FieldText = (props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id} className="ml-2 font-semibold text-lg">
        {props.label}
      </label>
      <TextField id={props.id} variant="outlined" placeholder={props.placeholder} value={props.value} onChange={props.onChange} name={props.id} disabled={props.disabled} />
    </div>
  );
};

export default FieldText;
