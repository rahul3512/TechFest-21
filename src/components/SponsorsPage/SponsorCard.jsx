import React from "react";
function SponsorCard() {
  return (
    <div className="container">
      <div className="sponsordesc row flex flex-row">
        <div className="col-sm-12 text-center d-flex justify-content-center align-items-center flex-column text-justify">
          <h1 className="heading">Grow with us</h1>
          <p className="col text-center">
            Wish to engage with our audience and be a part of an amazing technical festival? Sponsor techFEST - SLIET and expand your outreach by reaching out to over 5000 students from across the country. Due to the restrictions imposed by the pandemic we are offering virtual benefactions in exchange for your kind sponsorship. Join our community today. Drop your details and we will get in touch with you immediately. Don't forget to check out our sponsorship brochure!
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Alpha Sponsor</h4>
              <p className="card-text">
                Become an Alpha sponsor and avail the following benefactions!
              </p>

              <ul className="list px-2">
                <li className="card-item">Mailing lists of attendees</li>
                <li className="card-item">Logo on all posters of techFEST’21</li>
                <li className="card-item">Clickable logo on website</li>
                <li className="card-item">Advertisement in Souvenir &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Magazine.</li>
                {/* <li className="card-item">Advertisement in Sviesa Novine</li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="col ">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Beta Sponsor</h4>
              <p className="card-text">
                Feel like Beta sponsorship is something you would like to provide? Check out the benefits!
              </p>

              <ul className="list px-2">
                <li className="card-item">Mailing lists of attendees</li>
                <li className="card-item">Logo on all posters of &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;techFEST’21</li>
                <li className="card-item">Clickable logo on website</li>
                {/* <li className="card-item">Advertisement in Souvenir &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Magazine.</li> */}
                <li className="card-item">Logo in certificates</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Gamma Sponsor</h4>
              <p className="card-text">
                Gamma sponsors get these deliverables!
              </p>

              <ul className="list px-2">
                <li className="card-item">Clickable logo on website</li>
                <li className="card-item">Logo on posters of techFEST’21</li>
                <li className="card-item">Logo in certificates</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col ">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Delta Sponsor</h4>
              <p className="card-text">
                Wish to go for Delta? Look at what you get!
              </p>

              <ul className="list px-2">
                <li className="card-item">Clickable logo on website</li>
                <li className="card-item">Logo on posters of techFEST’21</li>
                <li className="card-item">Logo in  select certificates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12 px-3">
        <p className="disclaimer">* Please check the sponsorship brochure for more details about the sponsorship structure, categories, and benefactions. The deliverables and categories are completely negotiable<br />
          # Mailing list of those participants who opt for mails from sponsors</p>
      </div>
    </div>
  );
}
export default SponsorCard;
