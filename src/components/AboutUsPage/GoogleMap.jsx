import React from 'react'

function GoogleMap() {
    return (
        <div style={{ paddingTop: '100px', paddingBottom: '100px' }}>
            {/* <!--Section: Regular maps--> */}
            <section>

                {/* <!--Grid row--> */}
                <div className="row address">

                    {/* <!--Grid column--> */}
                    <div className="col-md-6 mb-4">

                        {/* <!--Card--> */}
                        <div className="card">

                            {/* <!--Card content--> */}
                            <div className="card-body text-center">

                                {/* <h4 className="font-up font-bold deep-purple-text mb-3"><strong>Regular map</strong></h4> */}

                                {/* <!--Google map--> */}
                                <div id="map-container" className="z-depth-1" style={{ height: '300px' }}>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13790.20042624762!2d75.6996642!3d30.2213855!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa45e3a23dfc09f9b!2sSant%20Longowal%20Institute%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1628200774008!5m2!1sen!2sin" style={{ width: '100%', height: '260px', border: '0' }} allowFullScreen loading="lazy"></iframe>
                                </div>

                            </div>
                            {/* <!--/.Card content--> */}

                        </div>
                        {/* <!--/.Card--> */}

                    </div>
                    {/* <!--Grid column--> */}

                    {/* <!--Grid column--> */}
                    <div className="col-md-6 mb-4">

                        {/* <!--Card--> */}
                        <div className="card">

                            {/* <!--Card content--> */}
                            {/*<div className="card-body text-center"> */}

                                {/* <h4 className="font-up font-bold deep-purple-text mb-3"><strong>Custom map</strong></h4> */}

                                {/* <!--Google map--> */}
                                {/* <div id="map-container-2" className="z-depth-1" style={{ height: '100%' }}>
                                    <h3 className="mb-4 text-uppercase">Delivery Info</h3>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="form3Example1m" className="form-control form-control-lg" />
                                                <label className="form-label">First name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="form3Example1n" className="form-control form-control-lg" />
                                                <label className="form-label" >Last name</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="text" id="form3Example8" className="form-control form-control-lg" />
                                        <label className="form-label" >Address</label>
                                    </div>



                                    <div className="row">
                                        <div className="col-md-6 mb-4">

                                            <select className="select">
                                                <option value="1">State</option>
                                                <option value="2">Option 1</option>
                                                <option value="3">Option 2</option>
                                                <option value="4">Option 3</option>
                                            </select>

                                        </div>
                                        <div className="col-md-6 mb-4">

                                            <select className="select">
                                                <option value="1">City</option>
                                                <option value="2">Option 1</option>
                                                <option value="3">Option 2</option>
                                                <option value="4">Option 3</option>
                                            </select>

                                        </div>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="text" id="form3Example3" className="form-control form-control-lg" />
                                        <label className="form-label" >Zip</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="text" id="form3Example2" className="form-control form-control-lg" />
                                        <label className="form-label" >Email</label>
                                    </div>

                                    <div className="d-flex justify-content-end pt-3">
                                        <button type="button" className="btn btn-success btn-lg ms-2"
                                            style={{ 'backgroundColor': 'hsl(210, 100%, 50%)' }}>Place order</button>
                                    </div>

                                </div>

                            </div> */}
                            {/* <!--/.Card content--> */}

                        </div>
                        {/* <!--/.Card--> */}

                    </div>
                    
                    {/* <!--Grid column--> */}

                </div>
                {/* <!--Grid row--> */}

            </section>
            {/* <!--Section: Regular maps--> */}

        </div>
    )
}
export default GoogleMap;