import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkIfRouteExists } from "utils/routerUtils";
import PageLoader from "./PageLoader";

export default function PublicRoute(item) {
  const user = useSelector((data) => data.user);

  const checkIfAccess = () => {
    // console.log("item.path", item.path, !checkIfRouteExists(item.path));
    if (!checkIfRouteExists(item.path)) {
      return item.noAccessPage;
    }
    return item.component;
  };

  return (
    <Route path={item.path} exact>
      <PageLoader component={checkIfAccess()} />
    </Route>
  );
}
