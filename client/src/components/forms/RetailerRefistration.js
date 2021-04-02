import React from "react";

const RetailerRegisteration = ({ value, handleChange, handleSubmit }) => {
  const { name, email, address, password, shop, mobile } = value;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "50px",
          background: "white",
          boxShadow: "2px 2px 10px black",
        }}
      >
        <div className="form-group form-group-expand " >
          <label className="float-left">Full Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            className="form-control"
            placeholder="Please Enter Full Name"
            value={name}
          />
        </div>
        <div className="form-group form-group-expand">
          <label className="float-left">Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            className="form-control"
            placeholder="Please Enter Email"
            value={email}
          />
        </div>
        <div className="form-group form-group-expand">
          <label className="float-left">Address</label>
          <input
            name="address"
            type="text"
            onChange={handleChange}
            className="form-control"
            placeholder="Please Enter Address"
            value={address}
          />
        </div>
        <div className="form-group form-group-expand">
          <label className="float-left">Mobile</label>
          <input
            name="mobile"
            type="text"
            onChange={handleChange}
            className="form-control"
            placeholder="Please Enter  Mobile Number"
            value={mobile}
          />
        </div>
        <div className="form-group form-group-expand">
          <label className="float-left">Shop Name</label>
          <input
            name="shop"
            type="text"
            onChange={handleChange}
            className="form-control"
            placeholder="Please Enter Shop Name"
            value={shop}
          />
        </div>
        <div className="form-group form-group-expand">
          <label className="float-left">Password</label>
          <input
            name="password"
            type="text"
            onChange={handleChange}
            className="form-control"
            placeholder=" set Password"
            value={password}
          />
        </div>

        <button className="btn btn-primary btn-outline-primary btn-lg left">
          Submit
        </button>
      </form>
    </>
  );
};

export default RetailerRegisteration;
