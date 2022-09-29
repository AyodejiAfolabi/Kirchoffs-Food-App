import { useNavigate } from 'react-router-dom'
function FirstPage(){
  let navigate=useNavigate()
  function routeToOrder(){
   
    navigate('/order')
  }
    return(
        <>
       <section className='firstpage container'>
    
    <div className="m-auto  intro-word text-center"> <p className="h1 text-white ">WELCOME TO THE KIRCHOFFS KITCHEN </p> </div>
    
    <div className="row my-5">
    
        <div className="col-lg-4 my-2">
            <div className="card border-0 bg-dark text-white mb-2  m-auto text-center py-3">
    <div className="card-body">
    <img  src={`https://res.cloudinary.com/dpfppw5ae/image/upload/w_400,h_280,c_scale/kirchoffs dinning`} className="img-fluid "/>
    </div>
    <h5 className=''>The kirchoffs Dining</h5>
    <button className='w-50 bttn m-auto'> Get Started </button>
    </div>
        </div>
       
        <div className="col-lg-4 my-2" onClick={routeToOrder}>
            <div className="card border-0 bg-dark text-white mb-2  m-auto text-center py-3    ">
    <div className="card-body ">
    <img  src={`https://res.cloudinary.com/dpfppw5ae/image/upload/w_400,h_280,c_scale/order food now`} className="img-fluid "/>
    </div>
    <h5>Order Food Now</h5>
    <button className='w-50 bttn m-auto'> See Details </button>
    </div>
        </div>
       
    




        <div className="col-lg-4 my-2">
            <div className="card border-0 bg-dark mb-2 text-white m-auto text-center py-3    ">
    <div className="card-body ">
    <img  src={`https://res.cloudinary.com/dpfppw5ae/image/upload/w_400,h_280,c_scale/kitchen section`} className="img-fluid "/>
    </div>
    <h5>Kitchen Section</h5>
    <button className='w-50 bttn m-auto'> View More </button>
    </div>
        </div>


    </div>
       </section>
        
        </>
    )
    
    }
    
    export default FirstPage