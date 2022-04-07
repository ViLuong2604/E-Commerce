import { async } from "@firebase/util";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { publicRequest } from "../../requestMethod";
import "./newUser.css";

export default function NewUser() {
  const[inputs,setInputs] = useState({});
  const history = useHistory();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  
  };
  const newUsersHandle =(e)=>{
    e.preventDefault();
    const createUser = async ()=>{
      await publicRequest.post('auth/register',inputs);
      window.confirm('Tạo user thành công ! quay lại trang chủ') && history.push('/')
    }
    createUser();
    
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form method="POST" className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" name="username" onChange={handleChange} placeholder="john" />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" name="fullname" onChange={handleChange} placeholder="John Smith" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} placeholder="john@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} placeholder="password" />
        </div>
        {/* <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div> */}
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="isAdmin" id="active">
         
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={newUsersHandle} >Create</button>
      </form>
    </div>
  );
}
