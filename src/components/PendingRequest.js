import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function PendingRequest(props){
    let dispatch=useDispatch()
    const {newOrder}=props
    const [order,setOrder]=useState([])

    useEffect(()=>{
        setOrder(newOrder)
        console.log(order)
    })

    const approveTx=(txId,index)=>{
        console.log(txId)
        let url=`http://localhost:4000/admin/approveTx`
        axios.post(url,{_id:txId}).then(res=>{
            if(res.data.status){
                setOrder(order.splice(index,1))
                let value=Math.floor(Math.random()*10000)
                dispatch({type:'approveTx',payload:value})
            }else{
                alert('network error, Try again.')
            }
        }).catch(err=>alert('network error, Try again.'))
    }
    return(
        <>
        <div className='w-100 container bg-white ' >
            <div className='row  table-responsive'>
                <table className='table  table-bordered w-100 mt-3'>
                    <thead style={{height:'',marginTop:'90px', fontFamily: 'Lobster, cursive'}}>
                        <tr>
                            <th>S/N</th>
                            <th>Order ID</th>
                            <th>Customer Email</th>
                            <th>Item/Quantity</th>
                            <th>Total Cost  (#)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((each,i)=>(

                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{each.orderId}</td>
                                <td>{each.email}</td>
                                <td>{each.items.map((item,i)=>(
                                    <ul>
                                        <li>{item.foodName} / {item.orderQuantity} (unit)</li>
                                    </ul>
                                ))}</td>
                                <td>{each.totalCost}</td>
                                <td><button onClick={()=>approveTx(each._id,i)} className="btn btn-success">Approve</button></td>
                            </tr>

                        ))}
                    </tbody>

                </table>
            </div>
        </div>
        </>
    )
}
export default PendingRequest