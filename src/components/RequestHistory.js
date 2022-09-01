import React, { useEffect, useState } from "react";
function RequestHistory(props){
    let {oldOrder}=props
    const [order,setOrder]=useState([])

    useEffect(()=>{
        setOrder(oldOrder)
    })
    
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
                            <th>Total Cost</th>
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
                                <td><button  className="btn btn-danger">Remove</button></td>
                            </tr>

                        ))}
                    </tbody>

                </table>
            </div>
        </div>
        </>
    )
}
export default RequestHistory