import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../services/auth.services';

export default function useFetchUserData() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        oldPassword: '',
        newPassword: ''
      });
      const navigate = useNavigate();
      useEffect(()=>{
        const fetchData = async ()=>{
            const token = JSON.parse(localStorage.getItem('userData'));
            if(!token){
                navigate("/login", {state: {message: "User is unauthorized!"}})
                return;
            }
            const result = await checkAuth(token, "/user/profile");
            setUserData(result.data.data);
        }
        fetchData()
    },[navigate])
    return {userData, setUserData};
}
