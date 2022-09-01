import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { useSelector} from "react-redux";

import './App.css';
import './styles/navbar.css'
import Navbar from "./components/navbar";
import FirstPage from "./components/firstpage";
import AdminHome from "./components/adminhome";
import Customer from "./components/customerhome";
import Cartspace from "./components/cartspace";
import AdminSignin from "./components/AdminSignin";
import Requests from "./components/requests";
import Cartstatus from "./components/Cartstatus";


function App() {
  let cartItems=useSelector(state=>state.count)
let kirchoffAdminToken=useSelector(state=>state.kirchoffAdminToken)

// alert(reduxCount)
// localStorage.removeItem('kirchoffAdminToken')

  const [foods,setFoods]=useState([])
  if(!localStorage.myKirchoffCart){
      let cart={items:[],cartId:Math.floor(Math.random() * 1798734876409991)}
      localStorage.myKirchoffCart=JSON.stringify(cart)
  }
  



  // const [cartItems,setCartItems]=useState(JSON.parse(localStorage.myKirchoffCart).items.length)

  // function changeItemNumber(param){
  //   setCartItems(param)
  //   alert(param)
  // }

return(
  <div>
 <Navbar/>
<Routes>

<Route path="/" element={<FirstPage/>} />
<Route path="/home" element={<Navigate to="/"/>}/>
<Route path="/admin" element={<AdminHome/> } />
<Route path="/adminsignin" element={<AdminSignin/>} />
<Route path="/order"  element={<Customer/>} />
<Route path="/requests" element={<Requests/>}/>
<Route path="/allcarts" element={<Cartstatus/>}/>
<Route path="/mycart" element={cartItems>0?<Cartspace/>:<Navigate to="/"/> } />



</Routes>



  </div>
) 

}
{/* <img src={process.env.PUBLIC_URL+"images/mypic.jpg"} /> */}
export default App;


 