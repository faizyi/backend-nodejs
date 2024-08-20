import { axiosHandler } from "../axios/axios.intercepters";
import Swal from 'sweetalert2'
export const signup = async (signupData, navigate, setIsSuccess,setApiMessage) => {
    try {
        const response = await axiosHandler.post('/user/signup', signupData);
        if (response.status === 200) {
            setIsSuccess(true)
            const data = response.data;
            localStorage.setItem('email', signupData.email);
            Swal.fire(data.message);
            navigate("/verify-otp")
            setApiMessage(data.message)
        }
    } catch (error) {
        setIsSuccess(false)
        if (error.response && error.response.data && error.response.data.errors) {
            return error.response.data.errors;
          } else if (error.response && error.response.data && error.response.data.message) {
            setApiMessage(error.response.data.message);
          } else {
            setApiMessage('Something went wrong');
          } 
    }
}

export const verifyOtp = async (otpData, setIsSuccess, navigate) => {
    try {
        const response = await axiosHandler.post("/user/verify-otp", otpData);
        if(response.status === 200){
            setIsSuccess(true);
            Swal.fire(response.data.message);
            navigate("/login")
            return response.data.message
        }
    } catch (error) {
        setIsSuccess(false)
        return error.response.data.message
    }
}

export const login = async (loginData, setIsSuccess, navigate) => {
    try {
        const response = await axiosHandler.post("/user/login", loginData);
        if (response.status === 200) {
            const data = response.data;
            setIsSuccess(true)
            localStorage.setItem("userData", JSON.stringify({ token: data.accessToken, uId: data.uid }))
            navigate("/create-todo")
            return data.message
        }
    } catch (error) {
        setIsSuccess(false)
        return error.response.data.message
    }
}

export const checkAuth = async (token,route) => {
    try {
        const uId = token.uId
        const response = await axiosHandler.post(route, {uId}, {
            headers: { "Authorization": `Bearer ${token.token}` }
        });
        return response
    } catch (error) {
        return error.response.data.message
    }
}

export const logout = async(id,navigate)=>{
    try {
        const response = await axiosHandler.post("/user/logout",{userId: id.uId});
        if(response.status === 200){
            localStorage.removeItem("userData")
            Swal.fire(response.data.message);
            navigate("/login")
            return response.data.message
        }
    } catch (error) {
        return error.response.data.message
    }
}