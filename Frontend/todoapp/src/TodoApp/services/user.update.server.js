import axios from "axios";

export const updateUser = async (data,token,setEditFields)=>{
    try {
        const response = await axios.put("/user/update", data,{
            headers: { "Authorization": `Bearer ${token.token}` }
        })
        console.log(response.data);
        setEditFields({});
    } catch (error) {
        console.log(error);
    }
}