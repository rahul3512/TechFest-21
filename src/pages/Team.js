import React from 'react'
import v1 from '../assets/team/amitoj.jpg'
import v2 from '../assets/team/arryaman.jpg'
import v3 from '../assets/team/harsimran.jpg'
import v4 from '../assets/team/mansi.jpg'
import v5 from '../assets/team/mehar.jpg'
import v6 from '../assets/team/prabh.JPG'
import v7 from '../assets/team/rahul-singh.jpg'
import v8 from '../assets/team/ridham-goyal.jpg'
import v9 from '../assets/team/ruchika.jpg'
import v10 from '../assets/team/shivam.jpg'
import v11 from '../assets/team/shrawan-singh.jpg'
import v12 from '../assets/team/soham.jpeg'
import v13 from '../assets/team/user-placeholder.jpg'
import v14 from '../assets/team/shiva.JPG'
import v15 from '../assets/team/virat-kumar-singh.jpg'
import v16 from '../assets/team/Tomar.jpeg'
import v17 from '../assets/team/om-parkash.jpeg'
import './Team.css'
export default function Team() {
    return (
        <div className="body">
            <header>
                <div className="container">
                    <div className="heading-container">
                        <h1>Meet the team</h1>
                        <p>When everyone works in teams, they achieve all the goals on which the organization functions. It makes things
                            easier for every person in an organization. Therefore, working in teams helps each person in the company. n an
                            organization, without teamwork, no work will be accomplished. Everyone works in teams; the amount of work that
                            is accomplished is more than what an individual alone can achieve.</p>
                    </div>
                </div>
            </header>
            <main>



                <section className="teams">
                    <div className="container">

                        <div className="teams__group">
                            <h2 className="teams__group-heading">UI UX Designers</h2>

                            <div className="team-grid">
                                <div className="team-grid__item">
                                    <img src={v12} alt="Sohamdas" className="team-grid__img" />
                                    <div className="team-grid__name">Soham</div>
                                </div>

                            </div>
                        </div>

                        <div className="teams__group">
                            <h2 className="teams__group-heading">Core Committee (Web Development)</h2>
                            <div className="team-grid">
                                <div className="team-grid__item">
                                    <img src={v4} alt="Sohamdas" className="team-grid__img" />
                                    <div className="team-grid__name">Mansi</div>
                                </div>
                            </div>
                        </div>

                        <div className="teams__group">
                            <h2 className="teams__group-heading">Backend Developer and Server Management</h2>
                            <div className="team-grid">
                                <div className="team-grid__item">
                                    <img src={v3} alt="Sohamdas" className="team-grid__img" />
                                    <div className="team-grid__name">Harsimran Singh</div>
                                </div>
                                <div className="team-grid__item">
                                    <img src={v1} alt="Sohamdas" className="team-grid__img" />
                                    <div className="team-grid__name">Amitoj Singh </div>
                                </div>
                            </div>
                        </div>

                        <div className="teams__group">
                            <h2 className="teams__group-heading">React Developmer</h2>
                            <div className="team-grid">
                                <div className="team-grid__item">
                                    <img src={v9} alt="Sohamdas" className="team-grid__img" />
                                    <div className="team-grid__name">Ruchika</div>
                                </div>
                                <div className="team-grid__item">
                                    <img src={v7} alt="Sohamdas" className="team-grid__img" />
                                    <div className="team-grid__name">Rahul Kumar</div>
                                </div>
                                <div className="team-grid__item">
                                    <img src={v6} alt="Sohamdas" className="team-grid__img" />
                                    <div className="team-grid__name">Prabhjot Singh</div>
                                </div>
                                <div className="team-grid__item">
                                    <img src={v8} alt="Sohamdas" className="team-grid__img" />
                                    <div className="team-grid__name">Ridham Goyal</div>
                                </div>
                                <div className="team-grid__item">
                                    <img src={v2} alt="Sohamdas" className="team-grid__img" />
                                    <div className="team-grid__name">Aryamann</div>
                                </div>
                                <div className="team-grid__item">
                                    <img src={v14} alt="Sohamdas" className="team-grid__img" />
                                    <div className="team-grid__name">Shiva</div>
                                </div>
                            </div>
                        </div>

                        <div className="teams__group">
                            <h2 className="teams__group-heading">HTML CSS Designer</h2>

                            <div className="team-grid">
                                <div className="team-grid__item">
                                    <img src={v5} alt="Sohamdas" className="team-grid__img" />
                                    <div className="team-grid__name">Meharpreet Singh</div>
                                </div>
                                <div className="team-grid__item">
                                    <img src={v10} alt="Sohamdas" className="team-grid__img" />
                                    <div className="team-grid__name">Shivam Prajapti</div>
                                </div>
                                <div className="team-grid__item">
                                    <img src={v15} alt="Sohamdas" className="team-grid__img" />
                                    <div className="team-grid__name">Virat Kumar Singh</div>
                                </div>
                                <div className="team-grid__item">
                                    <img src={v11} alt="Sohamdas" className="team-grid__img" />
                                    <div className="team-grid__name">Shrawan Singh</div>
                                </div>
                                <div className="team-grid__item">
                                    <img src={v13} alt="user placeholder" className="team-grid__img" />
                                    <div className="team-grid__name">Nilash</div>
                                </div>
                                <div className="team-grid__item">
                                    <img src={v16} alt="user placeholder" className="team-grid__img" />
                                    <div className="team-grid__name">Tomar</div>
                                </div>
                                <div className="team-grid__item">
                                    <img src={v17} alt="user placeholder" className="team-grid__img" />
                                    <div className="team-grid__name">Om Prakash</div>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>
            </main>
        </div>
    )
}
