export const customerReducer=(state=null,action)=>{
    switch(action.type){
        case "CUSTOMER_REGISTERED":
            return {...state,...action.payload};
       case "REMOVE_CUSTOMER":
        return null;
       default:
        return state       
    }
}