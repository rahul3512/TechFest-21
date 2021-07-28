import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { API } from '../../../Utils/backend';


import Base from '../Base'
import { getevents } from './helper/eventApiCalls';
function AdminEvents() {

    const [events, setEvents] = useState([]);
    const [error, seterror] = useState(false);

    const loadAllEvents = () => {
        getevents().then(data => {
            if (data.error) {
                seterror(data.error);
            } else {
                setEvents(data);
            }
        });
    };

    useEffect(() => {
        loadAllEvents();
    }, []);



    return (
        <Base title="Events">

            {events.map((event, index) => {
                return (
                    <div key={index} className="col-4 mb-4">
                        {/* <Card product={product} /> */}
                        {/* <Link
                            className="btn btn-success"
                            to={`/event/${event._id}`}
                        >
                            <span className="">View</span>
                        </Link> */}
                        <Link
                            className="btn btn-success"
                            to={`/superadmin/event/update/${event._id}`}
                        >
                            <span className="">Update</span>
                        </Link>
                        <pre>
                            {
                                JSON.stringify(event, null, 2)
                            }</pre>
                    </div>
                );
            })}
        </Base>
    )
}

export default AdminEvents
