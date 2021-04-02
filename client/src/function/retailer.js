import axios from './axios';
import {setHeaders} from './axioshelper'



export const getRetailersList=async (token)=>{
 return await axios.get(`/getretailerslist`,setHeaders("authtoken",token))
}


export const getRetailerDetail=async (retailerId,token)=>{
    return await axios.get(`/getretailerdetail/${retailerId}`,setHeaders("authtoken",token))
   }

   export const getRetailerLotteryInfo=async (retailerId,token)=>{
    return await axios.get(`/retailer/getlotteryinfo/${retailerId}`,setHeaders("authtoken",token))
   }


   export const addCustomer=async (customer,token)=>{

    return await axios.post(`/retailer/add-customer`,customer,setHeaders("authtoken",token))
   }

   export const saveColor=async (color,token)=>{

    return await axios.post(`/retailer/save-color`,color,setHeaders("authtoken",token))
   }


   export const getLotteryPrize=async (customerId,token)=>{

    return await axios.get(`/retailer/${customerId}/getlotteryprize`,setHeaders('authtoken',token))
   }



   export const savePrize=async (body,token)=>{

    return await axios.post(`/retailer/saveprize`,body,setHeaders("authtoken",token))
   }



