import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { API } from '../../../Utils/backend';

import Base from '../Base'
import { getCoordinators } from './helper/coordinatorApiCalls';
function AdminCoordinators() {

    const [coordinators, setCoordinators] = useState([]);
    const [error, seterror] = useState(false);

    const loadAllDomains = () => {
        getCoordinators().then(data => {
            if (data.error) {
                seterror(data.error);
            } else {
                setCoordinators(data);
            }
        });
    };

    useEffect(() => {
        loadAllDomains();
    }, []);



    return (
        <Base title="Coordinators">

            {coordinators.map((coordinator, index) => {
                return (
                    <div key={index} className="col-4 mb-4">
                        {/* <Card product={product} /> */}
                        {/* <Link
                            className="btn btn-success"
                            to={`/coordinator/${coordinator._id}`}
                        >
                            <span className="">View</span>
                        </Link> */}
                        <Link
                            className="btn btn-success"
                            to={`/superadmin/coordinator/update/${coordinator._id}`}
                        >
                            <span className="">Update</span>
                        </Link>
                        <pre>
                            {
                                JSON.stringify(coordinator, null, 2)
                            }</pre>
                    </div>
                );
            })}
        </Base>
    )
}

export default AdminCoordinators
