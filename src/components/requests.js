import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PendingRequest from './PendingRequest'
import RequestHistory from './RequestHistory'

function Requests(){
    const [oldOrder,setOldOrders]=useState([])
    const [newOrder,setNewOrder]=useState([])
    const approveTx=useSelector(state=>state.approveTx)
    const url=useSelector(state=>state.url)
    useEffect(()=>{
        let url=`${url}admin/allTrans`
        axios.get(url).then(res=>filterArr(res.data.transactions)).catch(err=>console.log(err))    
    },[approveTx])

    const filterArr=(arr)=>{
        let oldOrder=[]
        let newOrder=[]
        arr.forEach((each)=>{
            if(each.accepted){
                oldOrder.push(each)                
            }else{
                newOrder.push(each)
            }
        })
        console.log(oldOrder,newOrder)
        setOldOrders(oldOrder)
        setNewOrder(newOrder)
    }

    return(
        <>
        <section className="container-fluid my-5">
    <div className="row  py-5">
    <div className='w-100 container  bg-white' style={{height:'',paddingTop:'70px',fontFamily: 'Lobster, cursive'}}>
    <ul className="nav nav-pills d-flex justify-content-around" role="tablist">
            <li className="nav-item">
            <a className="nav-link active h4" data-toggle="pill" href="#home">Pending Orders</a>
            </li>
            <li className="nav-item">
            <a className="nav-link h4" data-toggle="pill" href="#menu1">History</a>
            </li>                
        </ul>
        {oldOrder.length==0&&newOrder.length==0?<div className=' mt-5 text-center mx-auto'><span className='text-dark'>No record is found</span></div>:<div className="tab-content">
            <div id="home" className="w-100 tab-pane active">
            {newOrder.length==0? <div className=' mt-5 text-center mx-auto'><span className='text-dark'>No record is found</span></div>: <PendingRequest newOrder={newOrder}/>      }                  
            </div>
            <div id="menu1" className="tab-pane fade">
                {oldOrder.length==0? <div className=' mt-5 text-center mx-auto'><span className='text-dark'>No record is found</span></div>:  <RequestHistory oldOrder={oldOrder}/>}
            </div>
        </div>}  
</div>
    
    
    </div>
    
    
        </section>
        </>
    )
}
export default Requests