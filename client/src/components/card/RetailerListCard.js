import React from 'react';
import {Link} from 'react-router-dom'


const RetailerListCard=({retailer,...rest})=>{

    

return(

  <Link to={`/admin/retailers/${retailer._id}`} style={{textDecoration:"none",textAlign:"center"}}>
    <div className="row p-3 m-2" style={{background:"white",boxShadow:"5px 5px 5px grey",cursor:"pointer"}}>
        <div className="col-md col-sm-12">
            {retailer.name}
        </div>
        <div className="col-md col-sm-12">
            {retailer.mobile}
        </div> <div className="col-md col-sm-12">
            {retailer.address}
        </div> <div className="col-md col-sm-12">
            {retailer.shop}
        </div>
       
    </div>

    </Link>
)

}

export default RetailerListCard