import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch} from "react-redux";
import Modal from "react-modal";
import * as yup from  'yup'
import {useFormik} from 'formik'
import axios from 'axios'
Modal.setAppElement("#root");


function Navbar(){


  let cartItems=useSelector(state=>state.count)
  let companyName=useSelector(state=>state.companyName)
  const url= useSelector(state=>state.url)
let dispatch= useDispatch()
  let navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function routeToAdminPage(){
   
    navigate('/admin')
  }
  function routeToOrder(){
   
    navigate('/order')
  }
  function routeToCarts(){
    navigate('/allcarts')
  }
  function routeToCart(){
   if(cartItems>0){
    navigate('/mycart')
   } 
   else{
    navigate('/order')

   }  }

   
const formik = useFormik({
  initialValues:{
 name:'',
    email:'',
 password:'',
 confirm_password:''
  },
  onSubmit:(values)=>{
    axios.post(`${url}admin/signup`,values).then(res=> {
      console.log(res)
    })
    .catch(
     (err=>console.log(err))
    )
  },
  validationSchema: yup.object({
    email: yup.string().required('required field'),
    password: yup.string().required().min(8, 'must contain at least 8 characters'), 
    confirm_password: yup.string()
    .min(8)
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf(
        [yup.ref("password")],
        "Both password need to be the same"
      ),
    })
    .required("Confirm Password Required"),
  })

})


  function routeToHome(){
   
    navigate('/')
  }

function logout(){
  dispatch({type:'loginError', payload:'You have succesfully logged out'})

  localStorage.removeItem('kirchoffAdminToken')
navigate('/adminsignin')
}



return(
  <>
        <nav class="navbar navbar2 fixed-bottom m-auto text-center">
        <button disabled={cartItems<1} onClick={routeToCart} className='btn w-50  btn-warning btn-cart m-auto'>Cart<i className="fa mx-2" >&#xf07a;</i>
<span className='badge badge-warning' id='lblCartCount'> {cartItems} </span></button>

</nav>

<nav className="navbar navbar-expand-lg navbar-dark fixed-top  bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand my-auto" href="#" style={{fontSize:'20px'}}>{companyName}</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a onClick={routeToHome} className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" onClick={routeToOrder} href="#">Order</a>
        </li>
        <li className="nav-item">
          <a onClick={routeToCarts} className="nav-link active" href="#">My Carts</a>
        </li>
      
      </ul>
      <div class="d-flex">
      <button disabled={cartItems<1} onClick={routeToCart} className='btn btn-warning btn-cart my-1'>Cart<i className="fa mx-2" >&#xf07a;</i>
<span className='badge badge-warning' id='lblCartCount'> {cartItems} </span></button>
      { localStorage.kirchoffAdminToken && <div class="dropdown">
    <button class="dropbtn"> 
    
    <span class="mx-3"><img src={require('../assets/admin.jpg').default} alt="Avatar" class="avatar"/></span>


    </button>
    <div className="dropdown-content dropdown-texts">
      <a  data-bs-toggle="modal" data-bs-target="#myModal" onClick={toggleModal}> Change Settings <i className='mx-2 fa fa-gear text-primary'></i></a>
   
      <a onClick={logout}>Log Out <i className='mx-2 fa fa-sign-out text-danger'></i></a>
      <a href="/admin">Home</a>
      <a href="/requests">Customer Requests</a>
    </div>
  </div> }




      </div>
    </div>
  </div>
</nav>



<Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal w-modal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >

<div class="modal-body">

<form onSubmit={formik.handleSubmit} className='m-auto text-center'>

<div className="input-group mb-3">
  <span className="input-group-text" id="inputGroup-sizing-default">@</span>
  <input type="text" name='email' onChange={formik.handleChange}  onBlur={formik.handleBlur} value={formik.values.email} className="form-control input-admin" placeholder="E-mail" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

{formik.touched.email &&<div className='text-danger form-error'>{formik.errors.email}</div>}


<div className="input-group input-group mb-3">
  <input placeholder="Password" value={formik.values.password}onChange={formik.handleChange}  onBlur={formik.handleBlur} name='password'  type="text" className="form-control input-admin" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
  <span className="input-group-text pointer-cursor" id="inputGroup-sizing-default"><i className='fa fa-eye' data-bs-toggle="tooltip" title="See Password"></i></span>
</div>
{formik.touched.password &&<div className='text-danger form-error'>{formik.errors.password}</div>}


<div className="input-group input-group mb-3">
  <input placeholder="Password"  value={formik.values.confirm_password} onChange={formik.handleChange}  onBlur={formik.handleBlur} name='confirm_password'  type="text" className="form-control input-admin" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
  <span className="input-group-text pointer-cursor" id="inputGroup-sizing-default"><i className='fa fa-eye' data-bs-toggle="tooltip" title="See Password"></i></span>
</div>
{formik.touched.confirm_password &&<div className='text-danger pb-3 form-error'>{formik.errors.confirm_password}</div>}



<button disabled={!formik.isValid || !formik.dirty} className='m-auto w-100 btn btn-warning submit-btn'>Save Change <i className='mx-2 fa fa-save text-white'></i></button>

</form>


</div>

        <button className='btn btn-secondary popover-test float-right' onClick={toggleModal}>Close modal</button>
        {/* <div className='d-flex'>abcd</div>   */}

      </Modal>

      


  </>
)

}

export default Navbar