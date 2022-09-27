import { useEffect, useState } from "react"
import {useSelector ,useDispatch } from "react-redux";
import { useFormik } from "formik";
import { PaystackConsumer } from 'react-paystack';
import { useNavigate } from "react-router-dom"; 
import * as yup from  'yup'
import axios from 'axios'

function Cartspace(){
    let [totalCost,setTotalCost]=useState(0)
const [cart,setCart]=  useState(JSON.parse(localStorage.myKirchoffCart))
const [foods,setFoods]=  useState(useSelector(state=>state.cartItems))
console.log(foods)
const [email,setEmail]=useState('')
let dispatch=useDispatch()
const url = useSelector(state=>state.url)
let cartItem= useSelector(state=>state.count)
let navigate=useNavigate()
useEffect( ()=>{
  console.log(localStorage.myKirchoffCart)
  if(JSON.parse(localStorage.myKirchoffCart)){
  setCart(JSON.parse(localStorage.myKirchoffCart))
  setFoods(JSON.parse(localStorage.myKirchoffCart).items)
  }
  console.log(cart)
if(cartItem<1){
  navigate('/')
}


},[cartItem])

const formik = useFormik({
  initialValues:{
 name:'',
    email:'',
    description:'',
    phone:'',
    address:''
  },
  onSubmit:(values)=>{
    // console.log(values)
  },
  validationSchema: yup.object({
    address : yup.string(),
    name : yup.string().required('Required Field'),
    email: yup.string().required('required field'),
    description: yup.string(),
    phone: yup.string().required('required field')
  })

})


const config = {
    reference: (new Date()).getTime().toString(),
    email:formik.values.email,
    amount: totalCost+'00',
    publicKey: 'pk_test_46ce0ceb0ba1554637c1bbdb46f87fdac4bb1433',
};

// you can call this function anything
const handleSuccess = (reference) => {
localStorage.myKirchoffCart=JSON.stringify({items:[]})
dispatch({type:'DECREASE_CART_LENGTH',payload:0})
dispatch({type:'emptycart',payload:{items:[]}})
dispatch({type:'emptycartItems',payload:[]})

formik.values.items=foods
formik.values.totalCost=totalCost
axios.post(`${url}food/saveTransaction`,formik.values).then(res=> {
  alert(`payment succesful \r\n \r\n CartID: ${res.data.cartId} `)  
localStorage.myKirchoffCart=JSON.stringify({items:[],lastCartId:res.data.cartId})
  console.log(res)
})
.catch(
 (err=>console.log(err))
)
navigate('/')  
  console.log(reference);
};

// you can call this function anything
const handleClose = () => {
  navigate('/')
}


const componentProps = {
    ...config,
    text: 'Check Out',
    onSuccess: (reference) => handleSuccess('payment successful'),
    onClose: handleClose
};

function calculateCost(){
let allCost=0
foods.forEach( (food,index)=>{
     allCost+= Number(Number(food.price)*Number(food.orderQuantity))
})
return allCost
}


useEffect(()=>{
setTotalCost(calculateCost)
})



function increase(index){
    let allCart=cart
    let allFoods=foods
    if(allFoods[index].orderQuantity==allFoods[index].quantity){
      alert('you cant order more than the availabe quantity')
      return false
    }
allFoods[index].orderQuantity+=1
allCart.items=allFoods
setFoods(allFoods)
setCart(allCart)
console.log(cart)
// alert(foods[index].quantity)
localStorage.myKirchoffCart=JSON.stringify(allCart)
setCart(JSON.parse(localStorage.myKirchoffCart))

}
function decrease(index){
    let allCart=cart
    let allFoods=foods
   if(foods[index].orderQuantity>1){   
allFoods[index].orderQuantity-=1
allCart.items=allFoods
setFoods(allFoods)
setCart(allCart)
console.log(foods)
localStorage.myKirchoffCart=JSON.stringify(allCart)
setCart(JSON.parse(localStorage.myKirchoffCart))
   }

}
function remove(index){
  let allCart=cart
  let allFoods=foods
  allFoods.splice(index,index+1)
allCart.items=allFoods
dispatch({type:'DECREASE_CART_LENGTH',payload:allFoods.length})
setFoods(allFoods)
setCart(allCart)
console.log(cart)
localStorage.myKirchoffCart=JSON.stringify(allCart)
setCart(JSON.parse(localStorage.myKirchoffCart))

}


return(

    <>
    <section className="cartspace my-5 py-5">

<div className="container m-auto text-center">

    <h3 className="his text-white">Your Orders</h3>
    <div>
        <table className="table table-bordered bg bg-dark text-white">
    <thead>
<tr>
  <th>S/N</th>
  <th>Food Name</th>
  <th>Available Quantity</th>
  <th>Your Order</th>  
  <th>Actions</th>
  <th>price/1</th>
</tr>
</thead>

<tbody>
{
  foods.map((food,index)=>(
<tr key={index}>
<td>{index+1}</td>
  <td>{food.foodName}</td>
  <td>{food.quantity}</td>
  <td>{food.orderQuantity}</td>
  
<td> <button onClick={()=>decrease(index)} className="add bg bg-warning mx-2"><i className="  fa fa-minus-circle"></i></button> <button onClick={()=>remove(index)}  className="btn btn-danger mx-2"><i className="fa fa-trash"></i></button> <button onClick={()=>increase(index)} className="add bg bg-success mx-2"><i className=" fa fa-plus-circle  outline-0"></i></button></td>
  <td>#{food.price}</td>
</tr>

  ))
}
</tbody>
<tfoot>

<tr>
  <td></td>
  <td></td>
  <td></td>
  <td className="m-auto">Total Price(#): <h2> <b>{totalCost}</b></h2> </td>
  <td>
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
<div className="col-md-6">
{formik.touched.phone &&<div className='text-danger'>{formik.errors.phone}</div>}

  <input className="form-control"  name="phone" placeholder="phone number"   onChange={formik.handleChange} value={formik.values.phone}  onBlur={formik.handleBlur}/>
</div>
<div className="col-md-6">
{formik.touched.name &&<div className='text-danger'>{formik.errors.name}</div>}

  <input name="name" className="form-control"   placeholder="Full Name"   onChange={formik.handleChange} value={formik.values.name}  onBlur={formik.handleBlur}/>
</div>
       </div>
       {formik.touched.email &&<div className='text-danger'>{formik.errors.email}</div>}

  <input className="form-control my-2" name="email" onChange={formik.handleChange} value={formik.values.email}  onBlur={formik.handleBlur} placeholder="please type your Email"/>


  {formik.touched.address &&<div className='text-danger'>{formik.errors.address}</div>}

    <input className="form-control my-2" name="address" onChange={formik.handleChange} value={formik.values.address}  onBlur={formik.handleBlur} placeholder="Address"/>

    {formik.touched.description &&<div className='text-danger'>{formik.errors.description}</div>}

<textarea className="form-control my-2" name="description" placeholder="Add a description .....   (optional)" onChange={formik.handleChange} value={formik.values.description}  onBlur={formik.handleBlur}></textarea>
  <PaystackConsumer {...componentProps} >
          { ({initializePayment}) => 
       <button type="submit"  disabled={!formik.isValid || !formik.dirty} className="btn btn-warning bstn text-white my-2" onClick={() => initializePayment(handleSuccess, handleClose)}>Check Out</button> }
        </PaystackConsumer>
</form>

  </td>
</tr>

</tfoot>

        </table>
</div>

</div>
    </section>
    
    </>
)

}

export default Cartspace