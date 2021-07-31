import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Base from '../Base'
import { getWorkshopSessions } from './helper/workshopSessionApiCalls';
function AdminWorkshopSessions() {

    const [workshopSessions, setWorkshopSessions] = useState([]);
    // const [error, seterror] = useState(false);

    const loadAllWorkshopSessions = () => {
        getWorkshopSessions().then(data => {
            if (data.error) {
                // seterror(data.error);
            } else {
                setWorkshopSessions(data);
            }
        });
    };

    useEffect(() => {
        loadAllWorkshopSessions();
    }, []);



    return (
        <Base title="Workshop Sessions">

            {workshopSessions.map((workshopSession, index) => {
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
                            to={`/superadmin/workshopSession/update/${workshopSession._id}`}
                        >
                            <span className="">Update</span>
                        </Link>
                        <pre>
                            {
                                JSON.stringify(workshopSession, null, 2)
                            }</pre>
                    </div>
                );
            })}
        </Base>
    )
}

export default AdminWorkshopSessions
