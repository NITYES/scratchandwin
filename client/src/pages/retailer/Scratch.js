import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScratchCard from "react-scratchcard";
import { toast } from "react-toastify";
import { Spin, Space } from "antd";
import RetailerHeader from "../../components/nav/RetailerHeader";

import { getLotteryPrize, savePrize } from "../../function/retailer";
import { Link } from "react-router-dom";

const Scratch = ({ match, history }) => {
  let settings;
  let go = false;

  const [prizeImage, setPrizeImage] = useState({});
  const [coverImage, setCoverImage] = useState({});

  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const customerId = match.params.customerId;
  const { user, customer } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (customer && customer._id === customerId) {
      setLoading(true);
      getLotteryPrize(customerId, user.token)
        .then((res) => {
          setPrizeImage(res.data.prize);
          setCoverImage(res.data.coverImage);
          setOk(true);
          setLoading(false);
        }, [])
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    } else {
      history.push("/retailer/customer-registeration");
    }
  }, []);

  if (ok) {
    settings = {
      width: 230,
      height: 230,
      finishPercent: 70,
      onComplete: () => {
        const body = {
          retailerId: user._id,
          customerId: customerId,
          scratchprize: prizeImage,
        };
        savePrize(body, user.token).then((res) => {
          toast.success("Prize Saved");
        });
        setPlayAgain(true);
      },
      image: coverImage.imageUrl,
    };

    go = true;
  }

  console.clear();
  return (
    <>
      <div className="scratch-container">
        <div className="scratch-nav">
          <RetailerHeader />
        </div>

        {loading && go ? (
          <div className="scratch-container">
            <Space size="middle">
              <Spin size="large" />
            </Space>
          </div>
        ) : (
          <div
            className="scratch-center"
            style={{ background: `${user.color}` }}
          >
            <ScratchCard {...settings}>
              <img
              alt="loading image"
                style={{ width: "230px", height: "230px" }}
                src={prizeImage.imageUrl}
              />
            </ScratchCard>
            {playAgain ? (
              <Link to="/retailer/customer-registeration">
                <button
                  className="btn btn-primary btn-lg m-3"
                  style={{ background: "white", width: "230px" }}
                >
                  Play Again
                </button>
              </Link>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Scratch;
