import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../redux/userReducer";

export default function Topbar() {
  const dispath = useDispatch();
  const logoutHandle =()=>{
    dispath(logout());
  }
  const user = useSelector(state => state.user)
  console.log(user.currentUser.other.img);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ViLuongAdmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <div onClick={logoutHandle} className="logout">
              LOGOUT
              </div>
          </div>
          <img src={user.currentUser.other.img ? user.currentUser.other.img : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
