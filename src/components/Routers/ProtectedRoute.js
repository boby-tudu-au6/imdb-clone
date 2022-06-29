import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLoader from "./PageLoader";
import { checkIfRouteExists } from "utils/routerUtils";

export default function ProtectedRoute(item) {
  const user = useSelector((data) => data.user);

  useEffect(() => {}, [user]);

  const checkIfAccess = () => {
    if (!checkIfRouteExists(item.path)) {
      return item.noAccessPage;
    }

    //if user is not logged in go to unauthorized page
    if (!user || !user.loggedIn) {
      return item.noAccessPage;
    }

    //for protected check if the route have access
    if (!item.access.includes(user.user.role)) {
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
