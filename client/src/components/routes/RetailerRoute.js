import React, { useEffect, useState } from "react";
import { Route} from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const RetailerRoute = ({ children, ...rest }) => {
 
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (user && user.token && user.role==="retailer") {

     setOk(true)

    }
  }, [user]);

  return ok ? (
    <>
    {/* <Header /> */}
    <Route {...rest}  />
    </>
  ) : (
    <LoadingToRedirect />
  );
};

export default RetailerRoute;
