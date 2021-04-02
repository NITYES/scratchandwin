import React, { useEffect, useState } from "react";
import { Route} from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import {authenticateAdmin} from '../../function/auth'

const AdminRoute = ({ children, ...rest }) => {
 
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch=useDispatch();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (user && user.token && user.role==="admin") {
//CHECK IS ADMIN FROM BACKEND AND THEN SEToK TO TRUE FOR MORE SECURITY PURPOSE

      authenticateAdmin(user.token).then(res=>{
        setOk(true);

      }).catch((error)=>{
        dispatch({
          type:"LOGOUT_SUCCESS"
        })
      })

    }
  }, [dispatch,user]);

  return ok ? (
    <>
    {/* <Header /> */}
    <Route {...rest}  />
    </>
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
