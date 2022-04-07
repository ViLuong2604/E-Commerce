import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethod";
import "./user.css";
import {useDispatch, useSelector} from'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from '../../firebase.js'
import { updateUsers } from "../../redux/apiCalls";
import Loading from "../../components/loading/Loading";

export default function User() {
  const [isFetching, setIsFetching] = useState(false);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const[filePath,setFilePath] =  useState('');
  const[user,setUser] = useState({});
  const location = useLocation();
  const usertId = location.pathname.split("/")[2];
  const history = useHistory();
  const dispath = useDispatch();
  useEffect(()=>{
   const getUser =  async ()=>{
     const res = await userRequest.get(`user/find/${usertId}`);
     setUser(res.data)
   }
   getUser();
  },[])
  useEffect(()=>{
    setFilePath(user.img ? user.img : '/user-icon.png')
  },[user])
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(()=>{
    file && hanndleUpdate()
    },[file] );
  const hanndleUpdate =   () => {
    
    setIsFetching(true);

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
 
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          
          setFilePath(downloadURL)
         setIsFetching(false);
         
        });
      }
    );
   } ;
   const updateHandle = (e)=>{
    e.preventDefault();
    const u = { ...inputs, img: filePath };
    
     updateUsers(dispath,usertId,u);
     window.confirm('Chinnh sửa thành công!!!') && history.push('/users')
  }
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.img ?  user.img : '/user-icon.png' }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.fullname ? user.fullname : user.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          {
            isFetching && <Loading />
          }
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                  name="username"
                  // defaultValue={user.username}
                  onChange={ handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={user.fullname && user.fullname}
                  name="fullname"
                  className="userUpdateInput"
                  onChange={ handleChange}
                  // defaultValue={user.fullname && user.fullname}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  // defaultValue={user.email}
                  name="email"
                  onChange={ handleChange}
                  placeholder={user.email}
                  className="userUpdateInput"
                />
              </div>
              
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={filePath}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" onChange={ (e)=> setFile(e.target.files[0])}  id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" disabled={isFetching} onClick={updateHandle}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
