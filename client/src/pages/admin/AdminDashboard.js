import React from 'react'
import AdminNav from '../../components/nav/AdminNav'
import {useHistory} from 'react-router-dom'


const AdminDashboard=()=>{

    const history=useHistory()

return (
    <div className="container-fluid">
        <div className="row" >
                  <div className="col-md-4 col-sm-12 mb-3" >
                      <AdminNav history={history}/>
                  </div>
                  <div className="col-md-8 col-sm-12 " style={{background:"lightblue",height:"100vh"}}>
                     
                     <div className="row" style={{background:"white",textAlign:"center",padding:"20px"}}>
                         <h3>
                         Admin Dashboard

                         </h3>
                     </div>

                  </div>
        </div>
    </div>
)
}

export default AdminDashboard