import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { saveColor } from "../../function/retailer";
import { logout } from "../../function/auth";


const RetailerHeader = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const history = useHistory();

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
 
    logout(user.token).then((res) => {});

    history.push("/login");
  };



  const handleColorChange = (e) => {
    e.preventDefault();
    saveColor({ color: e.target.value }, user.token)
      .then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log("Error saving color")
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a
        className="navbar-brand"
        style={{
          color: "#4A0D3B",
          fontSize: "25px",
          textShadow: "0px 0px 2px black",
        }}
        href="#"
      >
        ScratchandWin
      </a>
      <button
        style={{
          color: "#4A0D3B",
          borderRadius: "50px",
          boxShadow: "0 0 5px ",
        }}
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="fas fa-user"></span>
      </button>
      <div className="collapse navbar-collapse  floatright " id="navbarNav">
        <ul className="navbar-nav  ">
          <li className="nav-item active ">
            <a
              className="nav-link"
              style={{
                background: "black",
                boxShadow: "2px 2px 5px white",
                padding: "5px 10px",
                color: "white",
                borderRadius: "20px",
              }}
            >
              {" "}
              {`Welcome ${user.name}`}
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li onClick={handleLogout} className="nav-item active ">
            <a
              className="nav-link"
              style={{
                background: "black",
                padding: "5px 10px",
                color: "white",
                borderRadius: "20px",
              }}
            >
              Logout<span class="sr-only">(current)</span>
            </a>
          </li>
          <li>
            <button
              onClick={handleColorChange}
              value="#1651AD"
              style={{
                margin: "10px",
                width: "40px",
                height: "20px",
                boxShadow: "0 0 5px white",
                borderRadius: "50px",
                outline: "none",
                border: "none",
                background: "#1651AD",
              }}
            ></button>
            <button
              onClick={handleColorChange}
              value="#8215A5"
              style={{
                margin: "10px",
                width: "40px",
                height: "20px",
                boxShadow: "0 0 5px white",
                borderRadius: "50px",
                outline: "none",
                border: "none",
                background: "#8215A5",
              }}
            ></button>
            <button
              onClick={handleColorChange}
              value="#5EA925 "
              style={{
                margin: "10px",
                width: "40px",
                height: "20px",
                boxShadow: "0 0 5px white",
                borderRadius: "50px",
                outline: "none",
                border: "none",
                background: "#5EA925",
              }}
            ></button>
            <button
              onClick={handleColorChange}
              value="#AD1655"
              style={{
                margin: "10px",
                width: "40px",
                height: "20px",
                boxShadow: "0 0 5px white",
                borderRadius: "50px",
                outline: "none",
                border: "none",
                background: "#AD1655",
              }}
            ></button>
            <button
              onClick={handleColorChange}
              value="#303942 "
              style={{
                margin: "10px",
                width: "40px",
                height: "20px",
                boxShadow: "0 0 5px white",
                borderRadius: "50px",
                outline: "none",
                border: "none",
                background: "#303942",
              }}
            ></button>
            <button
              onClick={handleColorChange}
              value="#000000"
              style={{
                margin: "10px",
                width: "40px",
                height: "20px",
                boxShadow: "0 0 5px white",
                borderRadius: "50px",
                outline: "none",
                border: "none",
                background: "#000000",
              }}
            ></button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default RetailerHeader;
