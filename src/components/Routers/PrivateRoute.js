import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkIfRouteExists } from "utils/routerUtils";
import PageLoader from "./PageLoader";

export default function PrivateRoute(item) {
  const user = useSelector((data) => data.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const checkIfAccess = () => {
    if (!checkIfRouteExists(item.path)) {
      return item.noAccessPage;
    }
    //if user is not logged in go to unauthorized page
    if (!user || !user.loggedIn) {
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
