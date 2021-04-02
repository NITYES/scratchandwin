import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { Spin, Space } from 'antd';

const LoadingToRedirect=()=>{
    const[count,setCount]=useState(5);
    let history=useHistory();

    useEffect(()=>{

        const interval=setInterval(()=>{
            //
            setCount((currentcount)=>--currentcount)
        },1000)

        //redirect once count is equal to 0
        count===0 && history.push("/");

        //cleanup
  return ()=>{clearInterval(interval)}
    },[count,history])


    return (
    
        <div className="scratch-container" style={{justifyContent:"space-around"}}>
   <Space size="large">

   <Spin size="large" />
   </Space>
        </div>
    )
}

export default LoadingToRedirect