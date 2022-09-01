import { useState, useEffect } from "react"
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
function AdminHome(){
  
const [foodName,setFood]=useState()
    const [price,setPrice]=useState()
    const [quantity,setQuanity]=useState()
    const [foods,setFoods]=useState([])
    const [myfile, setmyfile] = useState('')
    const [change,setChange]=useState(true)
   const navigate= useNavigate()
   const dispatch=useDispatch()
   const url= useSelector(state=>state.url)
   const [spinner,setSpinner]=useState({spinnerClass:'fa fa-save',buttonText:'Save Changes'})
   const [editName,setEditName]=useState('')
   const [editPrice,setEditPrice]=useState('')
   const [editQuantity,setEditQauntity]=useState('')
   const [edit_id,setEditId]=useState('')

    window.onbeforeunload = function(event) {
      // localStorage.removeItem('kirchoffAdminToken')
  };
    
    useEffect( ()=>{
  dispatch({type:'loginError', payload:''})

if(!localStorage.kirchoffAdminToken){
 
  navigate('/adminsignin')
}
else{
let token=localStorage.kirchoffAdminToken

axios.get(`${url}admin/authenticate`, {headers:{
  'authorization' :  `Bearer ${token}`,
  'Content-Type':'application/json',
  'Accept':'application/json'
}}).then(res=>{
if(res.data.status){
console.log(res.data)
}
else{
  dispatch({type:'loginError', payload:res.data.message})
  localStorage.removeItem('kirchoffAdminToken')
navigate('/adminsignin')

}

}).catch(err=>{
  localStorage.removeItem('kirchoffAdminToken')
navigate('/adminsignin')
})


}
      
        let posturl=`${url}food/getfoods`
        axios.get(posturl).then( res=>{

if(res.data.status){
    let foodtray=res.data.foodtray
    setFoods(foodtray)
localStorage.allFoods=JSON.stringify(res.data.foodtray)
if(foodtray.length>0){
    setChange(false)
}

}
else{
    setFoods([])

}

        })

    },[editName])
   
     const pickFile = (e)=>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = ()=>{
            const result = reader.result
            setmyfile(result)
        }
     }


     const upload = ()=>{
        let url='http://localhost:4000/food/upload'
        // let totalfood=foods
       let foodObj={foodName,quantity,price,filename:myfile}
       console.log(foodObj)
       console.log({myfile})

        axios.post(url,foodObj).then((res)=>{
if(res.data.status){
setFoods(res.data.foodtray)
setFood('')
setPrice('')
setQuanity('')
localStorage.allFoods=JSON.stringify(res.data.foodtray)
alert('operation succesful')
} 

        }).catch( err=>console.log(err))

    }




function increase(index){

    let allFoods=foods
allFoods[index].quantity+=1

localStorage.allFoods=JSON.stringify(allFoods)
setFoods(JSON.parse(localStorage.allFoods))

}
function decrease(index){
    let allFoods=foods
   if(foods[index].quantity>1){   
   
allFoods[index].quantity-=1

localStorage.allFoods=JSON.stringify(allFoods)
setFoods(JSON.parse(localStorage.allFoods))

   }

}
function remove(index){
    let foodIndex=foods[index]._id
  let allFoods=foods
  allFoods.splice(index,1)

  localStorage.allFoods=JSON.stringify(allFoods)
  setFoods(JSON.parse(localStorage.allFoods))

  let url='http://localhost:4000/food/removeOne'
let obj={foodIndex}
  axios.post(url,obj).then( (res)=>{

    if(res.data.status){
alert('delete succesful')

setFoods(res.data.foodtray)
localStorage.allFoods=JSON.stringify(res.data.foodtray)
    } else{
        alert('operation failed')
    }
  })
}

function savecChanges(){
  setSpinner({...spinner,spinnerClass:'ml-1 spinner-grow spinner-grow-sm',buttonText:'Loading'})
let url='http://localhost:4000/food/savechange'

axios.post(url,foods).then( res=>{

    if(res.data.status){
        alert('operation succesful')
        setFoods(res.data.foodtray)
    localStorage.allFoods=JSON.stringify(res.data.foodtray)
  setSpinner({...spinner,spinnerClass:'fa fa-save',buttonText:'Save Changes'})
        }
    else{
  setSpinner({...spinner,spinnerClass:'fa fa-save',buttonText:'Save Changes'})
  alert('failed')
    }
    
            })
}

function editfoodobj(food){
  setEditName(food.foodName)
  setEditPrice(food.price)
  setEditQauntity(food.quantity)
  setEditId(food._id)
}
function saveEdited(){
  let obj={foodName:editName,price:editPrice,quantity:editQuantity,id:edit_id}
  console.log(obj)
  axios.post(`${url}food/editFood`,obj).then(res=>{
    console.log(res.data)
    setEditName('')
    setEditId('')
    setEditPrice('')
    setEditQauntity('')
  }).catch(err=>console.log(err))

}
return(

    <>
    <section className="container-fluid my-5">
<div className="row  py-5">

<div className="col bg bg-white py-2">
   <div className='col-md-6'>
  <input placeholder="Add a dish you wish to offer" value={foodName} onChange={(e)=>setFood(e.target.value)} className="form-control"/> 
  <input placeholder="price" value={price} className="input d-block my-2  px-2" type='number' onChange={(e)=>setPrice(e.target.value)} />
  <input type='number' value={quantity} placeholder="quantity" className="d-block my-2  px-2" onChange={(e)=>setQuanity(e.target.value)}/>
  <input type='file' className="d-block my-2" onChange={(e)=>pickFile(e)}/>  <button onClick={upload} className="btn btn-warning my-2">Add To Dish</button>
  </div>
<div className="my-4">
<p className="h2 his">List of Dishes you offer</p>

<div>
{foods[0]==undefined? <div className="bg-white py-5"> <i className="spinner-border ml-5"></i> <h6 className="ml-5 my-5">Loading .... 
    or <a onClick={()=>window.location.reload()} className="text-primary" style={{cursor:"pointer"}}>refresh the page</a> </h6> </div>: 
  <table className="table table-bordered">
    <thead>
<tr>
  <td>S/N</td>
  <td>Food Name</td>
  <td>quantity</td>
  <td>price</td>
  <td>Action</td>
</tr>
</thead>

<tbody>

 {foods.map((food,index)=>(
<tr key={index}>
<td>{index+1}</td>

  <td> {food.foodName}</td>
  <td>{food.quantity}</td>
  <td>{food.price}</td>
<td> <div class='row'> <div className='col-3'><button onClick={()=>decrease(index)}  className="add bg bg-warning"><i className="  fa fa-minus-circle"></i></button></div> <div className='col-3'><button onClick={()=>remove(index)} className="add bg bg-danger text-white"><i className="fa fa-trash  outline-0"></i></button></div> <div className='col-3'><button onClick={()=>increase(index)}  className="add bg bg-success"><i className=" fa fa-plus-circle  outline-0"></i></button></div>  <div className="col-3"> <button onClick={()=>editfoodobj(food)} data-target='#editModal' data-toggle='modal' className="add bg bg-secondary"> <i className=" fa fa-edit  outline-0"></i></button> </div>  </div> </td>
</tr>

  )) }

</tbody>
<tfoot>

<tr>
  <td colSpan={4}></td>
  <td> {!change?<button onClick={savecChanges} className="btn btn-success">{spinner.buttonText} <i className={spinner.spinnerClass}></i></button>: console.log(9)  } </td>
</tr>

</tfoot>
        </table> }

</div>


</div>

</div>


</div>

<div className='modal fade big-modal ' id='editModal' data-backdrop="static">
                    <div className='modal-dialog modal-dialog-centered'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h4 className='modal-title px-2 text-danger'>Edit Food</h4>
                                <button  type="button" className="close text-danger" data-dismiss="modal" >&times;</button>                             
                            </div>
                            <div className='modal-body border-zero'>
                              <div className="row">
                                <div className="form-row">
                                  <div className="input-group col"><div class="input-group-prepend">
                                    <div class="input-group-text">Food Name</div>
                                  </div>
                                    <input onChange={(e)=>setEditName(e.target.value)} value={editName} className="form-control"/>
                                  </div>
                                </div>
                                <div className="form-row mt-2">
                                  <div className="input-group col"><div class="input-group-prepend">
                                    <div class="input-group-text">Quantity</div>
                                  </div>
                                    <input onChange={(e)=>setEditQauntity(e.target.value)} value={editQuantity}  className="form-control"/>
                                  </div>
                                </div>

                                <div className="form-row mt-2">
                                  <div className="input-group col"><div class="input-group-prepend">
                                    <div class="input-group-text">Price</div>
                                  </div>
                                    <input onChange={(e)=>setEditPrice(e.target.value)} value={editPrice}  className="form-control"/>
                                  </div>
                                </div>

                              </div>                               
                                
                            </div>
                            <div className='modal-footer d-flex'>
                                <button  className='btn btn-danger m-1'>Go back</button>
                                <button onClick={saveEdited}  className='btn btn-success m-1' data-dismiss="modal">Save</button>         
                            </div>
                        </div>
                    </div>

                </div>

    </section>
    </>
)
}
export default AdminHome