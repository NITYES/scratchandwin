export const customerReducer=(state=null,action)=>{
    switch(action.type){
        case "CUSTOMER_REGISTERED":
            console.log(action.payload)
            return {...state,...action.payload};
       case "REMOVE_CUSTOMER":
        return null;
       default:
        return state       
    }
}