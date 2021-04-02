import axios from './axios';
import {setHeaders} from './axioshelper'


export const saveLottery=async (token,retailerId,obj)=>{
    return await axios.post(`/retailer/${retailerId}/savelottery`,obj,setHeaders('authtoken',token)
   
    )
}


export const getLotteryOfRetailer=async (retailerId,token)=>{

return await axios.get(`/retailer/${retailerId}/getlottery`,setHeaders('authtoken',token))

}