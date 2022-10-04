import { useNavigate } from 'react-router-dom'
function FirstPage(){
  let navigate=useNavigate()
  function routeToOrder(){
   
    navigate('/order')
  }
    return(
        <>
       <section className='bg-dark py-5 container-fluid'>
    
    
    <div className=" row py-5">
    
        <div className="col-sm-4 py-2">
            <div className="card border-0  text-white mb-2  m-auto text-center py-3" style={{backgroundColor:'#c2b615'}}>
    <div className="card-body">
    <img  src={`https://res.cloudinary.com/dpfppw5ae/image/upload/w_400,h_280,c_scale/kirchoffs dinning`} className="img-fluid w-100"/>
    </div>
    <h5 className=''>The kirchoffs Dining</h5>
    <button className='w-50 firstpage-btn m-auto'> Get Started </button>
    </div>
        </div>
       
        <div className="col-sm-4 my-2" onClick={routeToOrder}>
            <div className="card border-0  text-white mb-2  m-auto text-center py-3" style={{backgroundColor:'#c2b615'}}>
    <div className="card-body ">
    <img  src={`https://res.cloudinary.com/dpfppw5ae/image/upload/w_400,h_280,c_scale/order food now`} className="img-fluid w-100"/>
    </div>
    <h5>Order Food Now</h5>
    <button className='w-50 firstpage-btn m-auto'> See Details </button>
    </div>
        </div>
       
    




        <div className="col-sm-4 my-2">
            <div className="card border-0  mb-2 text-white m-auto text-center py-3" style={{backgroundColor:'#c2b615'}}>
    <div className="card-body ">
    <img  src={`https://res.cloudinary.com/dpfppw5ae/image/upload/w_400,h_280,c_scale/kitchen section`} className="img-fluid w-100"/>
    </div>
    <h5>Kitchen Section</h5>
    <button className='w-50 firstpage-btn m-auto'> View More </button>
    </div>
        </div>


    </div>
       </section>
        
        </>
    )
    
    }
    
    export default FirstPage