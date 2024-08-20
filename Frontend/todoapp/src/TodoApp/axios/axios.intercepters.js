import axios from "axios";
export const axiosHandler = axios.create({
    baseURL : "http://localhost:9000",
    headers : {"Content-Type" : "application/json"}
})
axiosHandler.interceptors.request.use(
    (config)=>{
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)
axiosHandler.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        return Promise.reject(error)
    }
)
