import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
function PendingRequest(props){
    let dispatch=useDispatch()
    const {newOrder}=props
    const [order,setOrder]=useState(newOrder)
    const url= useSelector(state=>state.url)
    const [filterText,setFilterText]=useState('')
    const [btn,setBtn]=useState({btnText:'approve', class:''})
    const [presentPage,setPresentPage]=useState(0)
    const displayOnce=3
    useEffect(()=>{
        let arr=[]
        if(filterText!==''){
            newOrder.forEach( (each,i)=>{
                if( each.orderId.toLowerCase().includes(filterText.toLowerCase()) || each.email.toLowerCase().includes(filterText.toLowerCase()) ){
                    arr.push(each)
                }
            })
            setOrder(arr)
        }else{
            setOrder(newOrder)
            filterByPosition(newOrder)
        }
    },[filterText])

    useEffect( ()=>{
        filterByPosition(newOrder)
    },[presentPage])
    const filterByPosition=(arr)=>{
        let newArr=[]
        arr.forEach( (each,i)=>{
            if((i>=displayOnce*presentPage && i<displayOnce*presentPage+displayOnce) ){
                newArr.push(each)
            }
        })
        setOrder(newArr)       
    }
    const approveTx=(txId,index)=>{        
        setBtn({btnText:'approve', class:'spinner-border spinner-border-sm text-white mx-2'})
        axios.post(`${url}admin/approveTx`,{_id:txId}).then(res=>{
            if(res.data.status){
                setBtn({btnText:'approve', class:''})
                let orders=newOrder
                setOrder(orders.splice(index,1))
                filterByPosition(orders)
                let value=Math.floor(Math.random()*10000)
                dispatch({type:'approveTx',payload:value})
            }else{
                alert('network error, Try again.')
                setBtn({btnText:'approve', class:''})

            }
        }).catch(err=>{
            setBtn({btnText:'approve', class:''})
            alert('network error, Try again.')})
    }
    function fastForward(){
        if(presentPage!==Math.ceil((newOrder.length)/displayOnce)-1){
            setPresentPage(presentPage+1)            
            setFilterText('')
        }

    }
    function backWard(){
        if(presentPage>0){            
        setPresentPage(presentPage-1)
        }
        setFilterText('')
    }
    function fastForwardEnd(){
        setPresentPage(Math.ceil((newOrder.length)/displayOnce)-1)        
        setFilterText('')
    }
    function backWardEnd(){
        setPresentPage(0)         
        setFilterText('')       
    }
    return(
        <>
        <div className='w-100 container bg-dark text-white' >
            <div className='row'>
                <form onSubmit={(e)=>e.preventDefault()} className="example my-3" style={{marginLeft:'auto'}}>
                    <input type="text" onChange={(e)=>setFilterText(e.target.value)} placeholder="Search.." className="search2"/><button className="search3 bg-primary border-none"><i  className='fa fa-search'></i></button> 
                </form>
                <table className='table  table-bordered w-100 mt-3 text-white table-responsive-sm'>
                    <thead style={{height:'',marginTop:'90px', fontFamily: 'Lobster, cursive'}}>
                        <tr>
                            <th>S/N</th>
                            <th>Order ID</th>
                            <th>Customer Email</th>
                            <th>Item/Quantity</th>
                            <th>Total Cost  (#)</th>
                            <th>Actions <i className={btn.class}></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((each,i)=>(

                            <tr key={i}>
                                <td>{i+1+presentPage*displayOnce}</td>
                                <td>{each.orderId}</td>
                                <td>{each.email}</td>
                                <td style={{height:'10px'}}> 
                                                {
                                                    (<div className={each.items.length > 2 ? 'display-drugs' : ''}>
                                                    <ol style={{listStyleType: 'circle'}}>                                               
                                                    {each.items.map((item,index)=>(
                                                        <li key={index}>{item.foodName} / {item.orderQuantity} (unit)</li>
                                                    ))}                                                
                                                    </ol>
                                                    </div>)
                                                }                                               
                                                </td>
                                <td>{each.totalCost}</td>
                                <td><button onClick={()=>approveTx(each._id,i)} className="btn btn-success">Approve</button></td>
                            </tr>

                        ))}
                    </tbody>

                </table>
                <div  className='row mb-5'>
                <div className="col-12" style={{float:'right'}}>

                <i style={{border:'1px solid black', width:'20px',borderRadius:'4px', cursor:'pointer'}} className={'fa fa-angle-double-left mr-2 text-center'  }  onClick={backWardEnd}></i>
                    
                    <i  className='fa fa-angle-left text-center' style={{marginRight:'35px',border:'1px solid black', width:'20px',borderRadius:'4px', cursor:'pointer'}}  onClick={backWard}></i>
                                    
                   <span className='text-center m-auto' style={{marginLeft:'20px'}}>{presentPage+1}</span>

                   <i className='fa fa-angle-right text-center' style={{marginLeft:'35px',border:'1px solid black', width:'20px',borderRadius:'4px', cursor:'pointer'}} onClick={fastForward}></i>
                     
                   <i className='fa fa-angle-double-right ml-2 text-center' style={{border:'1px solid black', width:'20px',borderRadius:'4px', cursor:'pointer'}}  onClick={fastForwardEnd} ></i>
                   <br/> <span style={{marginTop:'45px'}} className='text-white mx-5'>{Math.ceil((newOrder.length)/displayOnce)} pages</span>  
                </div>
            </div>
            </div>
        </div>
        </>
    )
}
export default PendingRequest