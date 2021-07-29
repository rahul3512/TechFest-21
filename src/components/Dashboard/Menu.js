import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../../auth/helper'


function Menu({ history }) {
    return (
        <div>
            <ul>



                {isAuthenticated() && isAuthenticated().user.role === 2 && (
                    <>
                        <li>
                            <Link to="/superadmin/dashboard">Super Admin Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/superadmin/coordinator">Add Coordinator</Link>
                        </li>
                        <li>
                            <Link to="/superadmin/adddomain">Add Domain</Link>
                        </li>
                        <li>
                            <Link to="/superadmin/addEvent">Add Event</Link>
                        </li>
                        <li>
                            <Link to="/superadmin/addworkshop">Add Workshop</Link>
                        </li>
                        <li>
                            <Link to="/superadmin/addworkshopsession">Add Workshop session</Link>
                        </li>
                        <li>
                            <Link to="/superadmin/admindomains">Admin Domains</Link>
                        </li>
                        <li>
                            <Link to="/superadmin/admincoordinators">Admin Coordinators</Link>
                        </li>
                        <li>
                            <Link to="/superadmin/adminworkshops">Admin Workshops</Link>
                        </li>
                        <li>
                            <Link to="/superadmin/adminworkshopsessions">Admin Workshop Sessions</Link>
                        </li>
                        <li>
                            <Link to="/superadmin/adminevents">Admin Events</Link>
                        </li>
                    </>

                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li>
                        <Link to="/admin/dashboard">Admin Dashboard</Link>
                    </li>
                )}







                {
                    isAuthenticated() && (
                        <li>
                            <span onClick={() => signout(() => {
                                history.push("/")
                            })}>Sign out</span>
                        </li>
                    )
                }

            </ul>
        </div >
    )
}

export default withRouter(Menu)
