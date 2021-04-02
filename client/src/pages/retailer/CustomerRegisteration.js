import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import RetailerHeader from "../../components/nav/RetailerHeader";
import { getRetailerLotteryInfo,addCustomer} from "../../function/retailer";
import { toast } from "react-toastify";

const { Option } = Select;

const CustomerRegisteration = ({history}) => {
  const [remaining, setRemaining] = useState(0);
  const [customerName, setCustomerName] = useState(null);
  const [customerMobile, setCustomerMobile] = useState(null);
  const [customerEmail, setCustomerEmail] = useState(null);
  const [option, setOption] = useState([
    { _id: "tv", name: "T.V" },
    { _id: "refrigerator", name: "Refrigerator" },
    { _id: "washing machine", name: "Washing machine" },
  ]);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [totalPurchase, setTotalPurchase] = useState();

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch=useDispatch()

  useEffect(() => {
    getRetailerLotteryInfo(user._id, user.token).then((res) => {
      setRemaining(res.data);
      dispatch({
        type:"REMOVE_CUSTOMER"
      })
    });
  }, []);


  const handleOptionChange = (value) => {
    setPurchasedItems([...value]);
  };

  //   handle customer name change
  const handleCustomerName = (e) => {
    setCustomerName(e.target.value);
  };

  //   handle customer mobile change
  const handleCustomerMobile = (e) => {
    setCustomerMobile(e.target.value);
  };

  //   handle customer email change
  const handleCustomerEmail = (e) => {
    setCustomerEmail(e.target.value);
  };

  //   handle customer total purchase change
  const handleCustomerTotalPurchase = (e) => {
    setTotalPurchase(e.target.value);
  };


  //handle form submit ..save to the database
  const handleSubmit=(e)=>{
e.preventDefault();
const customer={
    retailerId:user._id,
    customerName:customerName,
    customerMobile:customerMobile,
    customerEmail:customerEmail,
    purchasedItems:purchasedItems,
    totalPurchase:totalPurchase
}

addCustomer(customer,user.token).then(res=>{
    dispatch({
      type:"CUSTOMER_REGISTERED",
      payload:res.data
    })
    history.push(`/retailer/scratch/${res.data._id}`)
}).catch(err=>{
    toast.error(err.response.data.error)
})

  }

console.clear();
  return (
    <div
      className="container-fluid"
      style={{background:`${user.color}`}}
    >

    <div className="row align-items-center justify-content-center">
    <div className=" scratch-nav" style={{height:"20vh"}}>
    <RetailerHeader />

    


    </div>
    {remaining >0? (
          <div
            className="col-md-12 col-lg-7 col-sm-11 "
         style={{height:"80vh",background:`${user.color}`}}
          >
            <form onSubmit={handleSubmit} style={{background:"white",boxShadow:"2px 2px 10px black",borderRadius:"10px"}}>
            <h3 style={{marginTop:"10px"}}>Register Customer</h3>

              <input
                className="form-control"
                placeholder="Customer Name"
                onChange={handleCustomerName}
                value={customerName}
              />
              <br />
              <input
                className="form-control"
                style={{ width: "100%" }}
                placeholder="Mobile"
                onChange={handleCustomerMobile}
                value={customerMobile}
              />
              <br />
              <input
                style={{ width: "100%" }}
                className="form-control"
                placeholder="Email"
                onChange={handleCustomerEmail}
                value={customerEmail}
              />
              <br />
              <input
                style={{ width: "100%" }}
                className="form-control"
                placeholder="Total Purchased Amount "
                onChange={handleCustomerTotalPurchase}
                value={totalPurchase}
              />
              <br />
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Choose Purchased Item"
                defaultValue={[]}
                className="form-control"
                onChange={handleOptionChange}
              >
                {option &&
                  option.map((item, index) => (
                    <Option key={item._id}>{item.name}</Option>
                  ))}
              </Select>
              <br />

              <br />
              <button className="btn btn-primary btn-lg" style={{background:`${user.color}`,color:"white",marginBottom:"10px",boxShadow:"2px 2px 0px black"}}>Submit</button>
            </form>
          </div>
      ) : (
        <div className="scratch-container">
          <div style={{width:"90%",maxHeight:"300px",background:"white",color:"black",fontSize:"25px",margin:"10px auto"}}>
            Please Update Your Lottery.
          </div>
        </div>
      )}
    </div>
   
      
  


    </div>
  );
};

export default CustomerRegisteration;
