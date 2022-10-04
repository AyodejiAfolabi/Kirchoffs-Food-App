import React, { useEffect, useState } from "react";
function RequestHistory(props){
    let {oldOrder}=props
    const [order,setOrder]=useState(oldOrder)
    const [filterText,setFilterText]=useState('')
    const [presentPage,setPresentPage]=useState(0)
    const displayOnce=2

   
    useEffect(()=>{
        let arr=[]
        if(filterText!==''){
            oldOrder.forEach( (each,i)=>{
                if( each.orderId.toLowerCase().includes(filterText.toLowerCase()) || each.email.toLowerCase().includes(filterText.toLowerCase()) ){
                    arr.push(each)
                }
            })
            setOrder(arr)
        }else{
            setOrder(oldOrder)
            filterByPosition(oldOrder)
        }
    },[filterText])
    useEffect( ()=>{
        filterByPosition(oldOrder)
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
    function fastForward(){
        if(presentPage!==Math.ceil((oldOrder.length)/displayOnce)-1){
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
        setPresentPage(Math.ceil((oldOrder.length)/displayOnce)-1)        
        setFilterText('')
    }
    function backWardEnd(){
        setPresentPage(0)         
        setFilterText('')       
    }
    return(
        <>
        <div className='w-100 container bg-dark ' >
            <div className='row'>
            <form onSubmit={(e)=>e.preventDefault()} className="example my-3" style={{marginLeft:'auto'}}>
                <input type="text" onChange={(e)=>setFilterText(e.target.value)} placeholder="Search.." className="search2"/>
            </form>
                <table className='table  table-bordered w-100 mt-3 text-white table-responsive-sm'>
                    <thead style={{height:'',marginTop:'90px', fontFamily: 'Lobster, cursive'}}>
                        <tr>
                            <th>S/N</th>
                            <th>Order ID</th>
                            <th>Customer Email</th>
                            <th>Item/Quantity</th>
                            <th>Total Cost</th>
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
                            </tr>

                        ))}
                    </tbody>

                </table>
                <div  className='row mb-5'>
                <div className="col-12 text-white" style={{float:'right'}}>

                <i style={{border:'1px solid black', width:'20px',borderRadius:'4px', cursor:'pointer'}} className={'fa fa-angle-double-left mr-2 text-center'  }  onClick={backWardEnd}></i>
                    
                    <i  className='fa fa-angle-left text-center' style={{marginRight:'35px',border:'1px solid black', width:'20px',borderRadius:'4px', cursor:'pointer'}}  onClick={backWard}></i>
                                    
                   <span className='text-center m-auto' style={{marginLeft:'20px'}}>{presentPage+1}</span>

                   <i className='fa fa-angle-right text-center' style={{marginLeft:'35px',border:'1px solid black', width:'20px',borderRadius:'4px', cursor:'pointer'}} onClick={fastForward}></i>
                     
                   <i className='fa fa-angle-double-right ml-2 text-center' style={{border:'1px solid black', width:'20px',borderRadius:'4px', cursor:'pointer'}}  onClick={fastForwardEnd} ></i>
                   <br/> <span style={{marginTop:'45px'}} className='text-white mx-5'>{Math.ceil((oldOrder.length)/displayOnce)} pages</span>  
                </div>
            </div>
            </div>
        </div>
        </>
    )
}
export default RequestHistory