import React, { useState, useEffect } from "react";
import { useDispatch,useSelector} from "react-redux";
import { loginUser } from "../../function/auth";
import "./login.css";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom'

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const {user}=useSelector((state)=>({...state}))

  useEffect(() => {

   if(user && user.token){
     redirectBasedOnRole(user.role)
   }

    logininitialization();
  }, [user]);

  const redirectBasedOnRole = (role) => {
    if (role === "admin") {
      history.push("/admin/dashboard");
    }
    if (role === "retailer") {
      history.push("/retailer/customer-registeration");
    }
  };

  const logininitialization = () => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".containers");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password })
      .then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });

        localStorage.setItem("_id", res.data._id);
        localStorage.setItem("token", res.data.token);

        redirectBasedOnRole(res.data.role);
      })
      .catch((err) => {

if(err.response){
  toast.error(err.response.data.error);

}

      });
  };

  const handlesignup = (e) => {
    e.preventDefault();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="containers">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} class="sign-in-form">
            <h2 className="title">SIGN IN</h2>
            <div className="input-field">
              <i className="fa fa-user"></i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <br/>
            <input type="submit" value="Login" class="btn solid" />
            <Link to="/forgot-password">
            <a>Forgot Password</a>
            </Link>
          
          </form>
          {/* sign up form */}
          <form onSubmit={handlesignup} class="sign-up-form">
            <h2 className="title">SIGN UP</h2>
            <div className="input-field">
              <i className="fa fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input type="password" placeholder="password" />
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input
                className=" confirm password"
                placeholder=" confirm Password"
              />
            </div>
            <input type="submit" class="btn" value="Sign up" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>

            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>

            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
