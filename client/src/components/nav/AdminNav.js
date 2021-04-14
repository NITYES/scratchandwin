import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../function/auth";

const AdminNav = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const handleLogout = (e) => {
    dispatch({
      type: "LOGOUT_SUCCESS",
    });

    logout(user.token).then((res) => {});

    history.push("/login");
  };

  return (
    <nav
      className="admin-nav"
      style={{ background: "white", height:"100%",textAlign: "center",boxShadow:"0px 0px 10px  black" }}
    >
      <ul className="nav flex-column">
        <li key={1} className="nav-item" className="nav-link">
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li key={2} className="nav-item" className="nav-link">
          <Link to="/admin/register">Register</Link>
        </li>
        <li key={3} className="nav-item" className="nav-link">
          <Link to="/admin/retailers">Retailers List</Link>
        </li>
        <li key={4} className="nav-item" className="nav-link">
          <button onClick={handleLogout} className="btn btn-danger btn-lg">
            LOGOUT
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
