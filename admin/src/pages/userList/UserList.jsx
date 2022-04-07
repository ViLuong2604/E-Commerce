import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";
import {useDispatch, useSelector} from'react-redux'
import { getUsers } from "../../redux/apiCalls";
import { deleteUser } from "../../redux/userReducer";
export default function UserList() {
  const [data, setData] = useState(userRows);
  // const[users,setUsers]= useState([]);
  
  const dispath = useDispatch();
 
   useEffect( ()=>{
       getUsers(dispath);
   },[])
  const users = useSelector(state => state.user.users)
  const handleDelete = (id) => {
   window.confirm('bạn có chắc muốn xóa người dùng này !!!') && dispath(deleteUser(id))
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img ?params.row.img : '/user-icon.png' } alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
   
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        getRowId={Math.random}
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
