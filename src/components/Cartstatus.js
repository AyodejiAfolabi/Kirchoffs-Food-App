import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Cartstatus(){
    const [myCarts,setMyCarts]=useState([])
    const [searchText,setText]=useState('')
    const [errors,setError]=useState({searchedOnes:false,tableError:'',backendError:''})
    const url= useSelector(state=>state.url)    
    const [btn,setBtn]=useState({text:'Check',class:''})
    const search=()=>{
        setBtn({text:'',class:'spinner-border spinner-border-sm text-white mx-2'})
        setError({...errors,searchedOnes:true})
        axios.post(`${url}food/getHistory`, {email:searchText}).then(res=>{
            console.log(res.data)
            if(res.data.status){
                setMyCarts(res.data.transactions)
                setBtn({text:'Check',class:''})
            }
        }).catch(err=>{console.log(err)
            setBtn({text:'Check',class:''})
        })
    }

    return(
        <>
        
    <section className="cartspace my-5 py-5 bg-dark text-white">
        <hr/><br/>
        <div className='container'>
        <div className='mt-4  row'>
            <div className='col-md-4 my-2'>
                <input value={searchText} placeholder='type your email' onChange={(e)=>setText(e.target.value)} className='search4'/>
            </div>
            <div className='col-md-2 my-2'>
                <button onClick={search} className='btn btn-warning mx-2'>{btn.text} <i className={btn.class}></i></button>
            </div>
                </div>
                </div>

        <div className='mt-3 container'>
            {myCarts.length==0 && !errors.searchedOnes && <span className='mx-4'>Please type your email in the input and search</span>}
            {myCarts.length==0 && errors.searchedOnes?
            <span className='mx-4'>No match result for {searchText}</span>:
            <table className='table table-bordered w-100 mt-3 table-dark table-responsive-sm'>
                <tr>
                    <th>S/N</th>
                    <th>Order ID</th>
                    <th>Item/Quantity</th>
                    <th>Total Cost</th>
                    <th>Status</th>
                </tr>

                <tbody>
                    {myCarts.map((each,i)=>(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{each.orderId}</td>
                            <td>{each.items.map((item,k)=>(
                                <ul key={k}>
                                    <li>{item.foodName} / {item.orderQuantity} (unit)</li>
                                </ul>
                                ))}
                            </td>
                            <td>{each.totalCost}</td>
                            <td>{!each.accepted? <span className='text-center mx-auto'>Pending</span>:<span className='text-center mx-auto'><i className='text-success fa fa-check'></i></span>}</td>

                        </tr>
                    ))}
                </tbody>

                
            </table>
            }

        </div>

    </section>
        </>
    )
}

export default Cartstatus