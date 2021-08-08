import React from 'react'

function GoogleMap() {
    return (
        <div style={{ paddingBottom: '100px' }}>
            {/* <!--Section: Regular maps--> */}
            <section>

                {/* <!--Grid row--> */}
                <div className="row address">

                    {/* <!--Grid column--> */}
                    <div className="col-md-12 mb-4">

                        {/* <!--Card--> */}
                        <div className="card" style={{ height: '450px' }}>

                            {/* <!--Card content--> */}
                            <div className="card-body text-center">

                                {/* <h4 className="font-up font-bold deep-purple-text mb-3"><strong>Regular map</strong></h4> */}

                                {/* <!--Google map--> */}
                                <div id="map-container" className="z-depth-1" style={{ height: '410px' }}>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13790.20042624762!2d75.6996642!3d30.2213855!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa45e3a23dfc09f9b!2sSant%20Longowal%20Institute%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1628200774008!5m2!1sen!2sin" style={{ width: '100%', height: '410px', border: '0' }} allowFullScreen loading="lazy"></iframe>
                                </div>

                            </div>
                            {/* <!--/.Card content--> */}

                        </div>
                        {/* <!--/.Card--> */}

                    </div>
                    {/* <!--Grid column--> */}

                    {/* <!--Grid column--> */}

                </div>

                {/* <!--Grid column--> */}

                {/* </div> */}
                {/* <!--Grid row--> */}

            </section>
            {/* <!--Section: Regular maps--> */}

        </div>
    )
}
export default GoogleMap;