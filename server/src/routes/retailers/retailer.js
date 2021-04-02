const express=require('express');
const router=express.Router();
const {isAdmin,isRetailer}=require('../../middleware/authRole');
const {checkTokenAndLoggedStatus}=require('../../middleware/helperfunction')
const {getRetailersList,
    getRetailerDetail,
    saveLottery,
    getLotteryOfRetailer,
    addCustomer,
    getLotteryInfo,
  getLotteryPrize,
  saveScratchPrize
}=require('../../controller/retailers/retailer')

const {saveColor}=require('../../controller/user/auth')
const {uploadImage}=require('../../middleware/cloudinary');
const {validateCustomerData,isCustomerDataValidated}=require('../../middleware/validation/validateCustomer');


//ADMIN ROUTE
//GET "/api/getretailerslist"
router.get('/getretailerslist',checkTokenAndLoggedStatus,isAdmin,getRetailersList)
router.get('/getretailerdetail/:retailerId',checkTokenAndLoggedStatus,isAdmin,getRetailerDetail)

router.post('/retailer/:retailerId/uploadimage',checkTokenAndLoggedStatus,isAdmin,uploadImage)
router.post('/retailer/:retailerId/savelottery',checkTokenAndLoggedStatus,isAdmin,saveLottery)
router.get('/retailer/:retailerId/getlottery',checkTokenAndLoggedStatus,isAdmin,getLotteryOfRetailer)

//RETAILER ROUTE....
//add customer
router.post('/retailer/add-customer',checkTokenAndLoggedStatus,isRetailer,validateCustomerData,isCustomerDataValidated,addCustomer);
router.post('/retailer/save-color',checkTokenAndLoggedStatus,isRetailer,saveColor);

router.post('/retailer/saveprize',checkTokenAndLoggedStatus,isRetailer,saveScratchPrize);

router.get('/retailer/getlotteryinfo/:retailerId',checkTokenAndLoggedStatus,isRetailer,getLotteryInfo)
router.get('/retailer/:customerId/getlotteryprize',checkTokenAndLoggedStatus,isRetailer,getLotteryPrize)



module.exports=router