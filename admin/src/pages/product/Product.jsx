import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";

  import app from '../../firebase.js'
import { updateProducts } from "../../redux/apiCalls";
import Loading from "../../components/loading/Loading";
import { async } from "@firebase/util";
import { publicRequest } from "../../requestMethod";

export default function Product() {
  const [inputs, setInputs] = useState({});  
  const [cat, setCat] = useState([]);
  const history = useHistory();
  const dispath = useDispatch();
  const [file, setFile] = useState(null);
  const[filePath,setFilePath] =  useState('')
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [success,setSuccess]  = useState(false);
  const[isFetching,setIsFetching] = useState(false)
  const[product,setProduct]= useState({});
  // const product = useSelector((state) =>
   
  //   state.products.products.find((product) => product._id === productId)
  // );
  useEffect(()=>{
   const  getProduct = async()=>{
       const res = await publicRequest.get(`product/${productId}`)
       setProduct(res.data)
   } 
   getProduct();
  },[])
 useEffect(()=>{
   setFilePath(product.img)
 
 },[product])
 const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
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
         setIsFetching(false)
       });
     }
   );
  } ;
  const updateHandle =async (e)=>{
    e.preventDefault();
    setIsFetching(true)
    const product = { ...inputs, img: filePath, categories: cat };
     await updateProducts(dispath,productId,product)
     setIsFetching(false)
    window.confirm('update thành công !!!') && history.push('/products')
    
  }
 
 
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">{product.title}</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title} </span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">{product.price}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">active:</span>
                      <span className="productInfoValue">yes</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">no</span>
                  </div>
              </div>
          </div>
      </div>
     
      {
        isFetching &&  <Loading />
      }
       
      
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Title</label>
                  <input type="text" name="title" defaultValue={product.title} onChange={ handleChange} placeholder="Apple AirPod" />
                  <label>Description</label>
                  <input type="text" name="desc" defaultValue={product.desc} onChange={ handleChange}  placeholder="Description..." />
                  <label>Price</label>
                  <input type="number" name="price" defaultValue={product.price} onChange={ handleChange}  placeholder="Apple AirPod" />
                  <label>Categories</label>
                  <input type="text" onChange={handleCat}  defaultValue={product.categories} placeholder="man,women,children..." />
                  <label>In Stock</label>
                  <select name="inStock" id="idStock">
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
                 
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={filePath}  alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      
                      <input type="file" id="file" onChange={ (e)=> setFile(e.target.files[0])} style={{display:"none"}} />
                  </div>
                  <button className="productButton" disabled={isFetching} onClick={updateHandle} >Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
