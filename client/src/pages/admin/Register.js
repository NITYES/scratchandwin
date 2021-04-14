import React, { useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import RetailerRegisterationForm from "../../components/forms/RetailerRefistration";
import { registerRetailer } from "../../function/auth";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Register = ({ history }) => {
  const initialValue = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    shop: "",
    password: "",
  };

  const [value, setValue] = useState(initialValue);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  //destructure user
  const { token } = user;

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerRetailer(token, value)
      .then((res) => {
        //window.location.reload()
        toast.success(`${res.data.name} is created Successfully`);
      })
      .catch((error) => {
        if (error.response.data.error === "Aminn Restricted Area") {
          history.push("/login");

          dispatch({
            type: "LOGOUT_SUCCESS",
          });
        }
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100%" }}>
        <div className="col-md-4 mb-3">
          <AdminNav history={history} />
        </div>
        <div className="col-md-8 " >
          <div className="row justify-content-center ">
            <div className="col-lg-8 col-md-12 col-sm -12">
              <h3 className="m-2" style={{ textAlign: "center" }}>
                Create New Retailers
              </h3>

              <RetailerRegisterationForm
                value={value}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
