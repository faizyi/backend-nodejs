import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../services/auth.services';
export default function useCheckAuth() {
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchData = async ()=>{
            const token = JSON.parse(localStorage.getItem('userData'));
            if(!token){
                navigate("/login", {state: {message: "User is unauthorized!"}})
                return;
            }
            const result = await checkAuth(token, "/todo/create-todo");
        }
        fetchData()
    },[navigate])
}
