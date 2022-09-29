import { useState, useEffect } from "react"
import axios from "axios";
import {useSelector ,useDispatch } from "react-redux";
// import './searchbar.css'
function Customer(){
    let cartItems=useSelector(state=>state.cartItems)
    const dispatch=useDispatch()
    const [foods,setFoods]=useState([])
    const [foodArr,setFoodArr]=useState([])
    const [filterText,setFilterText]=useState('')
    const [displayCart,setDisplay]=useState(false)
    const url= useSelector(state=>state.url)
    if(localStorage.checkedOut){
        localStorage.checkedOut=false
    }

    useEffect( ()=>{
        axios.get(`${url}food/getfoods`).then( res=>{
if(res.data.status){
localStorage.allFoods=JSON.stringify(res.data.foodtray)
filterItems(res.data.foodtray)
setFoodArr(res.data.foodtray)
setDisplay(true)
}

else{
    setFoods([])
}

        })

    },[])
    useEffect(()=>{
        filterFoodArray()
    },[filterText])
   

function filterItems(allFoods){
    let allItems=[]
    if(localStorage.myKirchoffCart){
        allItems=JSON.parse(localStorage.myKirchoffCart).items
    }
    allFoods.forEach( (food,i)=>{
        allItems.forEach( (each,k)=>{
            if(food._id==each._id){             
                food.disableButtonKey=true
            }
           
        })
        
        })
        allFoods=allFoods.filter(each=>each.quantity>0)
        setFoods(allFoods)
}

function addToCart(food,index){
    if(!food.disableButtonKey){
    food.disableButtonKey=true
    food.orderQuantity=1
    let myCart=[]
    if(localStorage.myKirchoffCart){
     myCart=JSON.parse(localStorage.myKirchoffCart)
    }
    let newLength=Number(myCart.items.length)+1
     dispatch({type:'INCREASE',payload:newLength})
     myCart.items.push(food)    
    localStorage.myKirchoffCart=JSON.stringify(myCart)
foods[index]=food
setFoods(foods)

    }
    else{
        alert('already added')
    }

}

const filterFoodArray=()=>{
    let foodarr=foodArr
    let arr=[]
    console.log(filterText)
    if(filterText!==''){
        foodarr.forEach( (each,i)=>{
            if((each.foodName.toLowerCase()).includes(filterText.toLowerCase())){
                arr.push(each)
            }
        })
        setFoods(arr)
    }else{
        setFoods(foodArr)
    }
}

return(

    <>
    <section className='py-5'>
<div className="container my-5">
    
<form onSubmit={(e)=>e.preventDefault()} className="example" style={{float:'right'}}>
<input type="text" onChange={(e)=>setFilterText(e.target.value)} placeholder="Search.." className="search2 bg-dark text-white"/><button className="search3 bg-dark border-none"><i  className='fa fa-search'></i></button> 
    </form>
<div className='row mt-5' style={{clear:'both'}}>
    {foods[0]==undefined && foodArr[0]!==undefined ? <div className="bg-dark text-white py-5 mt-5"> <i className="fa fa-shopping-cart ml-5"></i> No result match for '{filterText}' <h6 className="ml-5 my-5"> </h6> </div>:
foods.map( (food,index)=>(

<div key={index} className="col-md-4 my-2">
<div className="card border-0 bg-dark mb-2  m-auto text-center text-white py-3">
<div className="card-body ">
<img  src={food.filename} className="img-fluid w-100"/>
</div>
<p className='h5'>{food.foodName}</p>
<p>Price: {food.price}</p>
<p>Available quantity: {food.quantity}</p>
{food.disableButtonKey? <button className="btn btn-warning w-50  m-auto">Added Already</button> :<button   onClick={()=>addToCart(food,index)} className='w-50 bttn m-auto'> Buy Now <i className='fa fa-cart'></i> </button> }

</div>    

</div>

) )
}

</div>
{foodArr[0]==undefined && <div className="bg-white py-5 mt-5"> <i className="spinner-border ml-5"></i> <h6 className="ml-5 my-5"> Please wait .... 
    or <a onClick={()=>window.location.reload()} className="text-primary" style={{cursor:"pointer"}}>refresh the page</a> </h6> </div>}
</div>

    </section>
    
    </>
)

}

export default Customer