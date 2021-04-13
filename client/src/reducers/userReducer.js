

export const userReducer=(state=null,action)=>{
    switch(action.type){
        case "LOGGED_IN_USER":
            return {...state,...action.payload};
       case "LOGOUT_SUCCESS":
        localStorage.removeItem('token');
        localStorage.removeItem('_id')
        return null;
       default:
        return state       
    }
}