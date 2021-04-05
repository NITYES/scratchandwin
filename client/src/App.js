import './App.css';
import {Switch,Route, Redirect} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/auth/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import Register from './pages/admin/Register';
import Retailers from './pages/admin/Retailers';
import { useEffect } from 'react';
import {isUserAuthenticated} from '../src/function/auth'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import AdminRoute from '../src/components/routes/AdminRoute';
import RetailerRoute from '../src/components/routes/RetailerRoute'
import RetailerDetails from '../src/pages/admin/RetailerDetails'
import CustomerRegisteration from '../src/pages/retailer/CustomerRegisteration'
import Scratch from './pages/retailer/Scratch';
import PageNotFound from './pages/PageNotFound';


function App() {

const history=useHistory();
const dispatch=useDispatch();


  useEffect(()=>{


    if(typeof window !=="undefined"){

      if(localStorage.getItem('token')){

                isUserAuthenticated(localStorage.getItem('token')).then(res=>{
                //we can change type from LOGGED_IN_USER TO USER_IS_AUTHENTICATED
                  dispatch({
                    type:"LOGGED_IN_USER",
                    payload:{...res.data,token:localStorage.getItem('token')}
                  })
                }).catch((error)=>{
                  dispatch({
                    type:"LOGOUT_SUCCESS"
                  })
                 
                });
      }
      else{
                history.push('/login');
      }
    }


  })

console.clear();

  return (
    <div className="App" >
      <ToastContainer/>
     
<Switch>
  
  <Redirect exact from="/" to="/login" />
  <Route  exact path="/login" component={Login} />
  <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
  <AdminRoute exact path="/admin/register" component={Register} />
   <AdminRoute exact path="/admin/retailers" component={Retailers} />
   <AdminRoute exact path="/admin/retailers/:retailerId" component={RetailerDetails} />
   <RetailerRoute  exact path="/retailer/customer-registeration" component={CustomerRegisteration} />
   <RetailerRoute  exact path="/retailer/scratch/:customerId" component={Scratch} />
   <Route  component={PageNotFound} />

</Switch>

    </div>
  );
}

export default App;
