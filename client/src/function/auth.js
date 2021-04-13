import axios from './axios';


export const loginUser=async (obj)=>{
return await axios.post(`/login`,obj)

}



export const isUserAuthenticated=async (token)=>{

    return await axios.post(`/isUserAuthenticated`,{},{
        headers:{
            authToken:token
        }
    })
}

export const logout=async (token)=>{

    return await axios.post(`/logout`,{},{
        headers:{
            authToken:token
        }
    })
}



export const registerRetailer=async (authToken,obj)=>{
    return await axios.post(`/create-user`,obj,
    {
        headers:{
            authToken:authToken
        }
    }
    )
}


export const authenticateAdmin=async (authtoken)=>{

    return await axios.post(`/admin/authenticateadmin`,{},
    {
        headers:{
            authToken:authtoken
        }
    }
    )


}


export const generatePasswordResetLink=async (email)=>{

    return await axios.post(`/request-forgot-password-link`,{email})


}