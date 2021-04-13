import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {generatePasswordResetLink} from '../../function/auth'



const ForgotPassword=()=>{
    const [email,setEmail]=useState('');
    const [linkmessage,setLinkMessage]=useState(false)

const handleEmailChange=(e)=>{

   setEmail(e.target.value)


}


const requestForgotPasswordLink=()=>{

    generatePasswordResetLink(email).then(res=>{
        setLinkMessage(true)

    }).catch(error=>{
        toast.error('User does not exist.')
    })

}

return(
    <div className="row justify-content-center align-items-center"  style={{height:"100vh"}}>
       {
           linkmessage?(<p>Reset password link has been sent to your email. Please Check</p>):( <div className="col-md-5" style={{background:"white",padding:"20px",textAlign:"center"}}>
           <input value={email} onChange={handleEmailChange} type="text" placeholder="Please enter email"/>
           <button style={{marginLeft:"20px"}} onClick={requestForgotPasswordLink}>Reset Password</button>
           </div>)
       }
       
    </div>
)

}

export default ForgotPassword