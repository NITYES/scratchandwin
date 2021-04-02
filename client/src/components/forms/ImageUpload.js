import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ImageUpload = ({ retailer, lottery, setLottery }) => {
  const { user } = useSelector((state) => ({ ...state }));

  //destructuring the lottery
  const { prize, coverImage, nextTimeImage } = lottery;

  let imageUpdated = [...prize];

  const fileUploadAndResize = (e) => {
    console.log(e.target.files);
    const files = e.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/retailer/${retailer._id}/uploadimage`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                imageUpdated.push(res.data);
                setLottery({ ...lottery, prize: imageUpdated });
              })
              .catch((err) => {
                toast.error("Error Uploading Images");
              });
          },
          "base64"
        );
      }
    }
  };

  const handleQuantityChange = (e) => {
    const newValue = Number(e.target.value);
    const public_id = e.target.getAttribute("inputattribute");
    //1find the prize in prize array using public_id and update the new value

    const changed = prize.find((ele) => ele.public_id === public_id);
    changed.quantity = newValue;
    changed.remaining = newValue;
    setLottery({ ...lottery });
  };


  const handleNameChange=(e)=>{
    const public_id = e.target.getAttribute("inputattribute");

    //find prize from the array
    const changed = prize.find((ele) => ele.public_id === public_id);
   changed.name=e.target.value;
   setLottery({...lottery})

  }

  const handleDeletePrize = async (public_id, e) => {
    //1 find the element and remove it from the prize array
   
    const filteredPrize = await imageUpdated.filter(
      (ele) => ele.public_id !== public_id
    );

    setLottery({ ...lottery, prize: filteredPrize });

    //2 delete from backend as well
    //

    //3. delete from cloudinary cloud storage

    //4 show delete success message or error
  };


 

  //handle cover Image change

  const handleCoverImageChange = (e) => {
    
    const files = e.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/retailer/${retailer._id}/uploadimage`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                setLottery({ ...lottery, coverImage: res.data });
              })
              .catch((err) => {
                toast.error("error uploading images");
              });
          },
          "base64"
        );
      }
    }
  };



  const handleDefaultImageChange = (e) => {
    
    const files = e.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/retailer/${retailer._id}/uploadimage`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                setLottery({ ...lottery, nextTimeImage: res.data });
              })
              .catch((err) => {
                toast.error("error uploading images");
              });
          },
          "base64"
        );
      }
    }
  };

  const handleCoverImageDelete = () => {
    setLottery({ ...lottery, coverImage: null });
  };



  const handleDefaultImageDelete = () => {
    setLottery({ ...lottery, nextTimeImage: null });
  };

  return (
    <>
      <hr />
      <div className="m-3" style={{background:"white",minHeight:"100px",padding:"3px"}}>
        <div >
          <div style={{textAlign:"center"}}>Please upload prize Card</div>
          <label className="btn btn-primary btn-raised float-left" >
            Choose File
            <input
              type="file"
              multiple
              accept="images/*"
              hidden
              onChange={fileUploadAndResize}
            />
          </label>
        </div>
        <div className="m-5">
          {imageUpdated.map((prize) => (
            <div
              key={prize.public_id}
              style={{ background: "" }}
              className="row justify-content-around align-items-center m-1"
            >
              <Avatar
                src={prize.imageUrl}
                size={60}
                shape="square"
                className="m-3 col-3"
                style={{maxWidth:"200px",height:"100px"}}
              />
              
              <input
                inputattribute={prize.public_id}
                onChange={handleQuantityChange}
                className="col-3 m-3"
                value={prize.quantity}
                type="number"
                style={{height:"50px",maxWidth:"100px"}}
              />

              <input 
             inputattribute={prize.public_id}
              onChange={handleNameChange}
              className="col-3 m-3"
              value={prize.name}
              type="text"
              style={{height:"50px",maxWidth:"200px"}}
              
              />
              
              <button
                onClick={() => handleDeletePrize(prize.public_id)}
                className="col-2 m-3 btn btn-primary btn-sm "
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* cover image area */}
      <div className="m-3" style={{ background: "white",minHeight:"100px",padding:"3px" }}>
        <div >
          <div style={{textAlign:"center"}}>Please upload Cover Image</div>
          <label className="btn btn-primary btn-raised float-left">
            Choose File
            <input
              type="file"
              multiple
              accept="images/*"
              hidden
              onChange={handleCoverImageChange}
            />
          </label>
        </div>
        {coverImage && (
          <div
            className="row justify-content-around m-5"
            
          >
            <Avatar
              src={coverImage.imageUrl}
              size={60}
              shape="square"
              className="m-3 col-3"
              style={{maxWidth:"200px",height:"100px"}}


            />
            <div className="col-3 m-3" style={{height:"50px",maxWidth:"100px"}}></div>
            <button
              onClick={() => handleCoverImageDelete(coverImage.public_id)}
              className="col-2 m-3 btn btn-primary btn-sm "
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* end cover image */}

      {/* next image  */}
      <div className="m-3" style={{ background: "white",minHeight:"100px",padding:"3px" }}>
        <div >
          <div style={{textAlign:"center"}}>Please upload Default Image</div>
          <label className="btn btn-primary btn-raised float-left">
            Choose File
            <input
              type="file"
              multiple
              accept="images/*"
              hidden
              onChange={handleDefaultImageChange}
            />
          </label>
        </div>
        {nextTimeImage && (
          <div
            className="row justify-content-around m-5"
            
          >
            <Avatar
              src={nextTimeImage.imageUrl}
              size={60}
              shape="square"
              className="m-3 col-3"
              style={{maxWidth:"200px",height:"100px"}}


            />
            <div className="col-3 m-3" style={{height:"50px",maxWidth:"100px"}}></div>
            <button
              onClick={() => handleDefaultImageDelete(nextTimeImage.public_id)}
              className="col-2 m-3 btn btn-primary btn-sm "
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {/* next image end point */}
    </>
  );
};

export default ImageUpload;
