import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/auth.services';
import Swal from 'sweetalert2'
export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const id = JSON.parse(localStorage.getItem("userData"));
    if(!id){
      Swal.fire("Alreday logout");
      return
    }
    const result = await logout(id,navigate)
    console.log(result);
  };
  return (
        <button onClick={handleLogout}>Logout</button>
  )
}
