import React, { Component } from 'react'
import gradeintLogo from '../../assets/images/backgroundDomains.png';
import classes from './domain.module.css'
import { API, BASE_API } from '../../Utils/backend.js';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CSSTransition } from 'react-transition-group';
import { ExploreEvents } from './ExploreEvents/ExploreEvents';
import axios from 'axios';
import { Snackbar } from '@material-ui/core';
import { Alert } from './Alert';
// import * as Scroll from "react-scroll";

class DomainPage extends Component {

    constructor(props) {
        super(props);
        this.eventRef = React.createRef();
    }
    settings = {
        dots: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 2,
        lazyLoad: 'progressive',
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    swipeToSlide: true,
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    swipeToSlide: true,
                    slidesToScroll: 1,
                    initialSlide: 6
                }

            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 3,
                    swipeToSlide: true,
                    slidesToScroll: 1,
                }

            }
        ]
    }

    state = {
        domains: [],
        currentDomain: {
            domain: {
                domainName: 'Domains',
                domainDescription: 'Unleash your inner technocrat & Participate in numerous events',
                facultyCoordinator: [],
                studentCoordinator: []
            },
            events: []
        },


        currentSelected: -1,
        exploreEvents: false,
        animate: false,
        workshops: [],
        Precula: false,
        loading: true,
        openSnackbar: false,
        error: ''

    }

    componentDidMount() {
        this.getDomains();
    }

    loadingMessage = () => {
        return (
            this.state.loading && (
                <div className=" text-center my-2">
                    <div className="spinner-border text-dark " role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        );
    };

    closeSnackbar = () => {
        this.setState({ openSnackbar: false })
    }

    getDomains = () => {
        axios.get(`${API}/domains`)
            .then(response => {
                this.setState({ domains: response.data, loading: false })

                if (this.props.detail.name === 'workshops') {
                    this.state.domains.map((item, pos) => {
                        return (
                            item.domainName === 'Precula' ? this.getSingleDomain(item._id, pos) : null
                        )
                    })
                    setTimeout(() => {
                        window.location.replace(`${window.location.pathname}#${this.props.detail.id}`)
                    }, 3000)
                }
                if (this.props.detail.name === 'events') {
                    // console.log(this.props)
                    this.state.domains.map((item, pos) => {
                        // console.log(this.props.detail.id , item._id)
                        return (
                            item._id === this.props.detail.id ? this.getSingleDomain(item._id, pos) : null
                        )
                    })
                    setTimeout(() => {
                        window.location.replace(`${window.location.pathname}#${this.props.detail.secId}`)
                    }, 3000)
                }
                else {
                    // window.location.replace('/domain');
                }


            }).catch(err => {

                // alert(err.response)
                this.setState({openSnackbar:true,error:'Network error'})
            })
    }
    getSingleDomain = (id, pos) => {
        axios.get(`${API}/domain/${id}`)
            .then(response => {
                this.setState({ currentDomain: response.data, Precula: false, exploreEvents: true, animate: true, currentSelected: pos })
                // this.setState({ currentDomain: response.data, Precula: false, exploreEvents: true, animate: true, currentSelected: pos })
                if (response.data.domain.domainName === 'Precula') {
                    this.getWorkshops();
                }
            }).catch(err => {
                // alert("error")
                this.setState({ openSnackbar: true, error: err.response })
            })
    }

    getWorkshops = () => {
        axios.get(`${API}/workshops`)
            .then(response => {
                this.setState({ workshops: response.data, Precula: true })
            }).catch(err => {
                this.setState({ openSnackbar: true, error: err.response })
            })
    }


    render() {
        return (
            <div className={classes.container} style={{ width: "100%" }}>
                <img src={this.state.exploreEvents ? `${BASE_API}${this.state.currentDomain?.domain?.photo}` : gradeintLogo} alt='' className={classes.displayImage} />
                <div className={classes.content}>
                    <CSSTransition
                        in={this.state.animate}
                        timeout={500}
                        classNames={classes.animate}
                        onExit={() => this.setState({ animate: false })}
                    >
                        <div className={classes.text}>
                            <h1>{this.state.currentDomain.domain.domainName}</h1>
                            <p>
                                {this.state.currentDomain.domain.domainDescription}
                            </p>
                        </div>
                    </CSSTransition>
                    {this.state.exploreEvents ? <button className={classes.btnExploreEvents} onClick={() => { this.eventRef.current.scrollIntoView() }}>{this.state.currentDomain.domain.domainName === 'Precula' ? 'Explore Workshops' : 'Explore Events'}</button> : null}
                    {
                        this.state.exploreEvents ?
                            <div className={classes.coordinators}>
                                <section className={classes.facultyCoordinatorContainer}>
                                    {this.state.currentDomain.domain.facultyCoordinator.map((item, pos) => {
                                        return (
                                            <div key={pos} className={classes.facultyCoordinator}>
                                                <img src={`${BASE_API}${item?.photo}`} alt='' className={classes.coordinatorImage} />
                                                <div>
                                                    <h6>{item.coordinatorName}</h6>
                                                    <p>{item.coordinatorDesignation}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </section>
                                <section className={classes.studentCoordinatorContainer}>
                                    {
                                        this.state.currentDomain.domain.studentCoordinator.map((item, pos) => {
                                            return (
                                                <div key={pos} className={classes.studentCoordinator}>
                                                    <img src={`${BASE_API}${item.photo}`} alt='' className={classes.coordinatorImage} />
                                                    <div>
                                                        <p>{item.coordinatorName}</p>
                                                        <p>{`+91 ${item.coordinatorPhone}`}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </section>
                            </div>
                            
                            :
                            null
                    }
                    <div className={classes.cardContainer}>
                        <div className={classes.cardHeadingContainer}>
                            <p>Domains</p>
                            <hr />
                        </div>

                        <Slider {...this.settings} >
                            {this.loadingMessage()}
                            {this.state.domains.map((item, pos) => {
                                return (
                                    <div className={classes.cardRoot} key={pos} onClick={() => {
                                        this.getSingleDomain(item._id, pos);
                                    }
                                    } >
                                        <div className={[classes.cardContent, this.state.currentSelected === pos ? classes.active : null].join(" ")}>
                                            <img src={`${BASE_API}${item.photo}`} alt='' className={classes.cardImage} />
                                            <div className={classes.cardData}>
                                                <h4>{item.domainName}</h4>
                                                <p>{item.domainDescription.length > 70 ? item.domainDescription.slice(0, 70) + '...' : item.domainDescription}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
                {this.state.exploreEvents ? <div ref={this.eventRef}>
                    <h1 className={classes.domainHeading}>{this.state.currentDomain.domain.domainName}</h1>
                    {

                        this.state.Precula ? this.state.workshops.map((item, pos) => {
                            return (<ExploreEvents id={item._id} content={item} key={pos} heading={this.state.currentDomain.domain.domainName} />)
                        }) :
                            this.state.currentDomain.events.map((item, pos) => {
                                return (<ExploreEvents id={item._id} key={pos} content={item} heading={this.state.currentDomain.domain.domainName} />)
                            })
                    }
                </div> : null}

                <Snackbar open={this.state.openSnackbar} autoHideDuration={6000} onClose={this.closeSnackbar}>
                    <Alert
                        onClose={this.closeSnackbar}
                        severity="error"
                    >
                        {this.state.error}
                    </Alert>
                </Snackbar>
                
            </div>
        );
    }
}

export default DomainPage
