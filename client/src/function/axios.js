import axios from 'axios'

const baseURL=process.env.REACT_APP_NODE_ENV==="PRODUCTION" ? "/api" : "http://localhost:4000/api"


export default axios.create({
    baseURL

})