import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { Backdrop, CircularProgress, styled } from '@mui/material';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  color: '#fff',
  zIndex: theme.zIndex.modal + 1
}))

export default function PageLoader(props) {
  return (
    <Suspense
      // fallback={
      //   <img
      //     style={{
      //       position: "absolute",
      //       top: "30%",
      //       left: 0,
      //       right: 0,
      //       bottom: 0,
      //       zIndex: 500,
      //       margin: "0 auto",
      //     }}
      //     src={loader}
      //     alt="loader gif"
      //   />
      // }
      fallback={
        <StyledBackdrop open>
          <CircularProgress color="inherit" />
        </StyledBackdrop>
      }
    >
      {props.component}
    </Suspense>
  );
}
