import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Base from '../Base'
import { getworkshops } from './helper/workshopApiCalls';
function AdminWorkshops() {

    const [workshops, setWorkshops] = useState([]);
    // const [error, seterror] = useState(false);

    const loadAllDomains = () => {
        getworkshops().then(data => {
            if (data.error) {
                // seterror(data.error);
                console.log(data.error);
            } else {
                setWorkshops(data);
            }
        });
    };

    useEffect(() => {
        loadAllDomains();
    }, []);



    return (
        <Base title="Workshop">

            {workshops.map((workshop, index) => {
                return (
                    <div key={index} className="col-4 mb-4">
                        {/* <Card product={product} /> */}
                        {/* <Link
                            className="btn btn-success"
                            to={`/workshop/${workshop._id}`}
                        >
                            <span className="">View</span>
                        </Link> */}
                        <Link
                            className="btn btn-success"
                            to={`/superadmin/workshop/update/${workshop._id}`}
                        >
                            <span className="">Update</span>
                        </Link>
                        <pre>
                            {
                                JSON.stringify(workshops, null, 2)
                            }</pre>
                    </div>
                );
            })}
        </Base>
    )
}

export default AdminWorkshops
