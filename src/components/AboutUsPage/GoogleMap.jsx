import React from 'react'

function GoogleMap() {
    return (
        <div style={{ paddingTop: '100px' }}>
            {/* <!--Section: Regular maps--> */}
            <section>

                {/* <!--Grid row--> */}
                <div className="row">

                    {/* <!--Grid column--> */}
                    <div className="col-md-6 mb-4">

                        {/* <!--Card--> */}
                        <div className="card">

                            {/* <!--Card content--> */}
                            <div className="card-body text-center">

                                {/* <h4 className="font-up font-bold deep-purple-text mb-3"><strong>Regular map</strong></h4> */}

                                {/* <!--Google map--> */}
                                <div id="map-container" className="z-depth-1" style={{ height: '250px' }}>
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
                            <div className="card-body text-center">

                                {/* <h4 className="font-up font-bold deep-purple-text mb-3"><strong>Address</strong></h4> */}

                                {/* <!--Google map--> */}
                                <div id="map-container-2" className="z-depth-1" style={{ height: '150%' }}>
                                    <h3 className="mb-4 text-uppercase text-md">Sant Longowal Institute of Engineering and Technology</h3>

                                    <div >
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline text-center">
                                                <p><i className="fas fa-map-marker-alt text-sm"></i> Longowal - 148106, Distt. Sangrur (Pb.), India</p>
                                                <p><i className="fas fa-phone-alt text-sm"></i>  +91-1672-280057</p>
                                            </div>
                                        </div>

                                    </div >

                                </div>

                            </div>
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