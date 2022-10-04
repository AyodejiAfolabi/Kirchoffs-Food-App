import {useSelector,useDispatch } from "react-redux";
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
function AdminSignin(){
    const navigate=useNavigate()
const dispatch=useDispatch()
    const [error,displayError]=useState( useSelector(state=>state.loginError))
let url=useSelector(state=>state.url)
const [btn,setBtn]=useState({btnText:'SUBMIT', class:''})

const formik = useFormik({
    initialValues:{
      email:'',
password:''
    },
    onSubmit:(values)=>{
        setBtn({btnText:'', class:'spinner-border spinner-border-sm text-white mx-2'})
axios.post(`${url}admin/signin`,values).then(res=>{
    
if(res.data.status){
    setBtn({btnText:'SUBMIT', class:''})
    localStorage.kirchoffAdminToken=res.data.token
    navigate('/admin')
}
else{
    setBtn({btnText:'SUBMIT', class:''})
    console.log(res)
    displayError(res.data.message)
}

}).catch(err=>{
    console.log(err)
})

      console.log(values)

    },
    validationSchema: yup.object({

      email : yup.string().required('Required Field'),
      password: yup.string().required('required field').min(8, `The password should always contain atleast 8 characters`),
 
    })
  
  })
  



return(
    <>
    
    <section className='container my-5'>
<div className='row my-5 py-5'>
<div className='col-6 m-auto bg bg-white' style={{borderRadius:'5px'}}>
<p className="text-center h3 py-5 intro-word">LOGIN AS ADMIN</p>

<form onSubmit={formik.handleSubmit}>
{error? <span className="text-danger text=center m-auto">{error}</span>: <br></br>}

<input placeholder="email" name="email" className='form-control my-2 p-2'  onChange={formik.handleChange} value={formik.values.email}  onBlur={formik.handleBlur}/>
{formik.touched.email &&<div className='text-danger'>{formik.errors.email}</div>}


<input placeholder="password" name="password" className='form-control my-2 p-2'  onChange={formik.handleChange} value={formik.values.password}  onBlur={formik.handleBlur}/>

{formik.touched.password &&<div className='text-danger'>{formik.errors.password}</div>}

</form>

<button  disabled={!formik.isValid || !formik.dirty} onClick={()=>formik.handleSubmit()} className='my-3 w-100 btn btn-warning'>{btn.btnText}<i className={btn.class}></i></button>


</div>

</div>

    </section>
    
    </>
)
}

export default AdminSignin