import React from "react";
import { Snackbar, Alert } from '@mui/material'
import { useSelector, useDispatch } from "react-redux";
import { closeSnack } from "store/reducers/snack.slice";

function SnacbarComponent() {
  const dispatch = useDispatch();
  const { open, type, text } = useSelector((state) => state.snack);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={8000}
      onClose={() => dispatch(closeSnack())}
    >
      <Alert variant="filled" severity={type} sx={{ width: "100%" }} onClose={() => dispatch(closeSnack())}>
        {text}
      </Alert>
    </Snackbar>
  );
}

export default SnacbarComponent;
