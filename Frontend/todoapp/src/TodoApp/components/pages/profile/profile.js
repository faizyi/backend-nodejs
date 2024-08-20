// import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
// import Logout from '../auth/logout.page';
// import useFetchUserData from '../../../customHooks/useFetchUserData';
// import { useState } from 'react';
// import { updateUser } from '../../../services/user.update.server';
export default function ProfilePage() {
  const navigate = useNavigate();
//   const {userData, setUserData} = useFetchUserData();
//   const [editFields, setEditFields] = useState({});
//   const [disable, setDisable] = useState(true);
//   const handleInputChange =(e)=>{
//     const { name , value} = e.target;
//     setUserData((prev)=>({
//       ...prev,
//       [name] : value
//     }))
//   }
//   const handleSave = async()=>{
//     setDisable(true)
//     const token = JSON.parse(localStorage.getItem('userData'));
//     if(!token){
//       navigate("/login", {state: {message: "User is unauthorized!"}})
//       return;
//   }
//     const result = await updateUser(userData,token,setEditFields)
//     // console.log(userData.name);
//     // setEditFields({});
//   }
//   const handleEdit = (field)=>{
//     setDisable(false)
//     setEditFields((prev) => ({
//       ...prev,
//       [field]: !prev[field]
//     }));
//   }
  return (
    <div>
        profile
    </div>
    // <Container className="mt-5">
    //   <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
    //   <Form className="mb-4">
    //     {Object.keys(userData).map((k,i)=>(
    //     <Form.Group controlId={`formBasic${k}`} key={i}>
    //       <Form.Label>{k.charAt(0).toUpperCase() + k.slice(1)}</Form.Label>
    //       <div className="flex">
    //         <Form.Control disabled={!editFields[k]} value={userData[k]} onChange={handleInputChange}
    //         type={k === "password" ? "password" : "text"} name={k}
    //         className={`form-input mt-1 block w-full ${!editFields[k] ? 'bg-gray-200' : 'bg-white'}`} />
    //         <button
    //             type="button"
    //             onClick={() => handleEdit(k)}
    //             className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
    //           >
    //             {editFields[k] ? "Lock" : "Edit"}
    //           </button>
    //       </div>
    //     </Form.Group>
    //     ))}

    //     <div className="text-center mt-10">
    //       <Button variant="primary" onClick={handleSave} 
    //       className={`mr-2 ${disable ? "disabled" : "enabled"}`}>Save</Button>
    //       <Button variant="secondary">Cancel</Button>
    //     </div>
    //   </Form>

    //   <div className="text-center">
    //     <Link className="btn btn-danger"><Logout/></Link>
    //   </div>
    // </Container>
  );
}
