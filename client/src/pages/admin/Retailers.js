import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getRetailersList } from "../../function/retailer";
import { useSelector, useDispatch } from "react-redux";
import RetailerListCard from "../../components/card/RetailerListCard";
import { Spin, Space } from "antd";

const Retailers = ({ history }) => {
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const authtoken = user.token;

  useEffect(() => {
    setLoading(true);
    getRetailersList(authtoken)
      .then((res) => {
        setLoading(false);
        setRetailers(res.data);
      })
      .catch((error) => {
        if (error.response.data.error === "Aminn Restricted Area") {
          history.push("/login");

          dispatch({
            type: "LOGOUT_SUCCESS",
          });
        }
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 col-sm-12 mb-3">
          <AdminNav />
        </div>
        <div
          className="col-md-8"
          style={{ minHeight: "100vh" }}
        >
          {loading ? (
            <div style={{ background: "white" }} className="scratch-container">
              <Space size="middle">
                <Spin size="large" />
                <div></div>
              </Space>
            </div>
          ) : (
            <div>
              <h3 className="m-4">Retailer List</h3>
              {retailers.map((retailer) => (
                <RetailerListCard key={retailer._id} retailer={retailer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Retailers;
