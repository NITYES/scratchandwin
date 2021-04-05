import React, { useEffect, useState } from "react";
import { getRetailerDetail } from "../../function/retailer";
import { useSelector, useDispatch } from "react-redux";
import AdminNav from "../../components/nav/AdminNav";
import RetailerListCard from "../../components/card/RetailerListCard";
import ImageUpload from "../../components/forms/ImageUpload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { saveLottery, getLotteryOfRetailer } from "../../function/lottery";
import { toast } from "react-toastify";
import { Spin, Space } from "antd";

const RetailerDetails = ({ match, history }) => {
  const initialLotteryValue = {
    retailerId: match.params.retailerId,
    prize: [],
    totalPrize: 0,
    startDate: new Date(),
    endDate: new Date(),
    frequency: 1,
    coverImage: null,
    nextTimeImage: null,
    timeDifference: 0,
  };

  const [retailer, setRetailer] = useState({});
  const [loading, setLoading] = useState(false);
  const [lottery, setLottery] = useState(initialLotteryValue);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const retailerId = match.params.retailerId;

  useEffect(() => {
    setLoading(true);
    getRetailerDetail(retailerId, user.token).then((res) => {
      setLoading(false);
      setRetailer(res.data);
      getLotteryOfRetailer(retailerId, user.token)
        .then((res) => {
          setLottery(res.data);
        })
        .catch((err) => {
          toast.error("Something Went Wrong")
        });
    });
  }, [retailerId,user.token]);

  //get total prize count
  const getTotalPrizeCount = () => {
    let total = 0;
     lottery.prize.map((obj) => {
      total = total + Number(obj.quantity);
    });

    return total;
  };

  const handleFrequencyChange = (e) => {
    const newFrequency = Number(e.target.value);
    setLottery({ ...lottery, frequency: newFrequency });
  };

  const handleSavePrize = async () => {
    saveLottery(user.token, match.params.retailerId, lottery)
      .then((res) => {
        toast.success("Lottery Saved");
      })
      .catch((error) => {
        if (error.response.data.error === "Aminn Restricted Area") {
          history.push("/login");

          dispatch({
            type: "LOGOUT_SUCCESS",
          });
        }
        toast.error("sorry lottery not saved");
      });
  };

  const handleStartDateChange = (date) => {
    setLottery({ ...lottery, startDate: date });
  };

  const handleEndDateChange = (date) => {
    setLottery({ ...lottery, endDate: date });
  };

  const getDifference = () => {
    let difference_ms = new Date(lottery.endDate) - new Date(lottery.startDate);
    difference_ms = difference_ms / 1000;
    difference_ms = difference_ms / 60;
    difference_ms = difference_ms / 60;
    var days = Math.floor(difference_ms / 24);
    return days;
  };

  //handle reset prize
  const handleResetPrize = () => {
    const prize = lottery.prize;
    const resetPrize = prize.map((singleitem) => {
      return {
        ...singleitem,
        quantity: 1,
        remaining: 1,
        won: 0,
      };
    });

    setLottery({ ...lottery, prize: resetPrize });
  };

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-4 col-sm-12 mb-3">
          <AdminNav />
        </div>
        {loading ? (
          <div className="scratch-container">
            <Space size="middle">
              <Spin size="large" />
            </Space>
          </div>
        ) : (
          <div className="col-md-8" style={{ background: "#53aa64" }}>
            <div>
              <RetailerListCard retailer={retailer} />
              <ImageUpload
                retailer={retailer}
                lottery={lottery}
                setLottery={setLottery}
                getTotalPrizeCount={getTotalPrizeCount}
              />
              <div className="row m-3" style={{ background: "white" }}>
                <div className="col-md-4 m-3 col-sm-12">
                  <p>Starting Date</p>
                  <DatePicker
                    selected={new Date(lottery.startDate)}
                    onChange={handleStartDateChange}
                  />
                </div>
                <div className="col-md-4 m-3 col-sm-12 ">
                  <p>End Date</p>
                  <DatePicker
                    selected={new Date(lottery.endDate)}
                    onChange={handleEndDateChange}
                  />
                </div>
              </div>
              <div
                className="row m-3"
                style={{ background: "white", padding: "10px" }}
              >
                {" "}
                Total Prize count is :{" "}
                <strong style={{ padding: "0px 10px " }}>
                  {" "}
                  {getTotalPrizeCount()}{" "}
                </strong>{" "}
                in{" "}
                <strong style={{ padding: "0px 10px " }}>
                  {getDifference()}
                </strong>{" "}
                days
              </div>
              <hr />
              <div
                className="m-3"
                style={{ background: "white", padding: "10px" }}
              >
                <label>
                  Frequency :
                  <input
                    style={{ marginLeft: "15px", padding: "5px 10px" }}
                    onChange={handleFrequencyChange}
                    value={lottery.frequency}
                    type="number"
                  />
                </label>
              </div>
              <hr />
              <div className="row">
                <div
                  className="col-md-6 col-sm-12"
                  style={{ textAlign: "center" }}
                >
                  <button
                    style={{ background: "white", padding: "10px 40px" }}
                    onClick={handleSavePrize}
                    className="btn btn-lg btn-primary"
                  >
                    Save
                  </button>
                </div>

                <div
                  className="col-md-6 col-sm-12"
                  style={{ textAlign: "center" }}
                >
                  <button
                    style={{ background: "white", padding: "10px 40px" }}
                    onClick={handleResetPrize}
                    className="btn btn-lg btn-primary"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetailerDetails;
