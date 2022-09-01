


const initstate={
    loginError:'',
    url:'http://localhost:4000/',
    kirchoffAdminToken: localStorage.kirchoffAdminToken,
    adminLogin:false,
    approveTx:'' 
}

const reducer=(state=initstate,action)=>{
    if(!localStorage.myKirchoffCart){
        state.cart={}
        state.count=0
        state.cartItems=[]
    }else{
        state.cart=JSON.parse(localStorage.myKirchoffCart)
        state.cartItems=JSON.parse(localStorage.myKirchoffCart).items
        state.count=JSON.parse(localStorage.myKirchoffCart).items.length
    }


    if(action.type=='loginError'){
        let value=action.payload
        let newState={...state,loginError:value}
return newState
       
    }
    if(action.type=='INCREASE'){
        let value=action.payload
        let newState={...state,count:value}
return newState
       
    }
     if(action.type=='DECREASE_CART_LENGTH'){
        let value=action.payload
        let newState={...state,count:value}
return newState
    }
    if(action.type=='emptycart'){
        let value=action.payload
        let newState={...state,cart:value}
return newState
    }
    if(action.type=='emptycartItems'){
        let value=action.payload
        let newState={...state,cartItems:value}
return newState
    }
    if(action.type=='approveTx'){
        let value=action.payload
        let newState={...state,approveTx:value}
return newState
    }



return state;
}

export default reducer