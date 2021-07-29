import React, { Component } from 'react'
import classes from './exploreEvents.module.css'
import { API, BASE_API } from '../../../Utils/backend';
import { Calendar, Clock, PersonPlus } from 'react-bootstrap-icons'
import { isAuthenticated } from '../../../auth/helper/index.js'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import { Link } from 'react-router-dom';
import { getUser } from '../../Dashboard/user/helper/userapicalls';
import { getWorkshop, registerInEventAsTeam, registerInEvent, registerInWorkshop } from '../../../auth/helper/DomainRegistration';
import image from '../../../assets/images/backgroundDomains.png'


export class ExploreEvents extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        user: isAuthenticated().user,
        token: isAuthenticated().token,
        isWorkshopRegistered: false,
        currentWorkshop: {
            sessions: []
        },
        open: false,
        popUpMessage: '',
        positiveAction: '',
        completeUser: null,
        viewSchedule: false,
        isEventRegistered: false,
        openTeamDialog: false,
        addTeam: false,
        memberId: ''
    }

    getUserData = () => {
        if (this.state.completeUser === null) {
            getUser(this.state.user._id, this.state.token).then((data) => {
                console.log(`GET USER DATA:`);
                console.log(data)
                if (data.error) {
                    // setValues({ ...values, error: data.error });
                    console.log(data.error);
                } else {
                    this.setState({ completeUser: data })
                    if (data.workshopsEnrolled.length > 0) {
                        data.workshopsEnrolled.map(item => {
                            if (this.props.id === item._id) {
                                this.setState({ isWorkshopRegistered: true })
                            }
                        })
                        // this.setState({isWorkshopRegistered:true})
                    }
                    if (data.eventRegIn.length > 0) {
                        data.eventRegIn.map(item => {
                            console.log(item)
                            if (this.props.id === item._id) {
                                this.setState({ isEventRegistered: true })
                            }
                        })
                        // this.setState({isWorkshopRegistered:true})
                    }
                    // setCompleteUser(data)

                }
            });
        }

    }

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    handleClickOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        if (this.state.addTeam) {
            registerInEventAsTeam(this.state.memberId);
        }
        this.setState({ open: false, openTeamDialog: false, addTeam: false })
    }
    handleClickViewSchedule = () => {
        this.loadWorkshop(this.props.id)
        this.setState({ viewSchedule: true })
    }
    handleClickCloseViewSchedule = () => {
        this.setState({ viewSchedule: false, openTeamDialog: false, addTeam: false })
    }
    handleClickAddTeam = () => {
        this.setState({ addTeam: true, positiveAction: 'Add Team Member' })
    }
    _handleTextFieldChange = (e) => {
        this.setState({ memberId: e.target.value })
    }



    loadWorkshop = (workshopId) => {
        getWorkshop(workshopId).then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                this.setState({ currentWorkshop: data })
                console.log(data)
            }
        });
    };


    registerWorkshop = (workshopId) => {
        this.handleClickOpen();
        if (!this.state.user) {
            var status = !this.state.user
            console.log(status)
            this.setState({ popUpMessage: 'You are not Logged in. Please Log in first', positiveAction: 'Log in' })
        } else {
            console.log(this.state.currentWorkshop)
            console.log(this.state.completeUser)
            registerInWorkshop(this.state.user._id, this.state.token, workshopId).then(
                data => {
                    console.log(data)
                    if (data.error) {
                        console.log(data.error)
                        this.setState({ popUpMessage: data.error, positiveAction: 'OK' })
                    } else {
                        console.log("registered success")
                        this.setState({ isWorkshopRegistered: true, popUpMessage: 'Registration Successful', positiveAction: 'OK' })
                    }
                }
            ).catch(err => {
                console.log(err)
                this.setState({ isWorkshopRegistered: false, popUpMessage: err, positiveAction: 'OK' })
            })
        }

    }

    componentDidMount = () => {
        this.getUserData();
    }

    registerAsTeam = () => {
        console.log('register as team')
        this.setState({ openTeamDialog: true, positiveAction: 'Confirm' })
    }

    registerEvent = (eventId) => {
        this.handleClickOpen();
        if (!this.state.user) {
            var status = !this.state.user
            console.log(status)
            this.setState({ popUpMessage: 'You are not Logged in. Please Log in first', positiveAction: 'Log in' })
        } else {
            console.log(this.state.user)
            console.log(this.props.content.participantCountMax)
            {
                this.props.content.participantCountMax > 1 ? this.registerAsTeam()
                    :

                    registerInEvent(this.state.user._id, this.state.token, eventId).then(
                        data => {
                            console.log(data)
                            if (data.error) {
                                console.log(data.error)
                                this.setState({ popUpMessage: data.error, positiveAction: 'OK' })
                            } else {
                                console.log("registered success")
                                this.setState({ isEventRegistered: true, popUpMessage: 'Registration Successful', positiveAction: 'OK' })
                            }
                        }
                    ).catch(err => {
                        console.log(err)
                        this.setState({ isEventRegistered: false, popUpMessage: err, positiveAction: 'OK' })
                    })
            }
        }
    }
    render() {
        return (
            <div id={this.props.id} className={classes.eventContainer}>
                <hr className={classes.divider} />
                <main className={classes.eventContent}>
                    <div className={classes.eventImage}>
                        <img src={`${BASE_API}${this.props.content.photo}`} alt='' className={classes.image} />
                        {
                            this.props.heading === 'Precula' ?
                                <div className={classes.eventDeadline}>
                                    <Calendar color='white' size={16} />
                                    <p>{`Register Before : `} </p>
                                    <Clock color='white' size={16} />
                                    <p>{`Time : `}</p>
                                </div>
                                :
                                <div className={classes.eventDeadline}>
                                    <Calendar color='white' size={16} />
                                    <p>{`Register Before : ${this.props.content.regEndDate.split('T')[0]}`} </p>
                                    <Clock color='white' size={16} />
                                    <p>{`${this.props.content.regEndDate.split('T')[1].split('.')[0]}`}</p>
                                </div>
                        }
                    </div>
                    {/* SECTION 2 */}
                    {
                        this.props.heading === 'Precula' ?
                            <div className={classes.eventInfo}>
                                <section className={classes.eventInfoData}>
                                    <h1>{this.props.content.workshoptName}</h1>
                                    <p>{this.props.content.workshopDescription}</p>
                                    <strong>Start Date : DD/MM/YYYY     </strong><br />
                                    <strong>End Date : DD/MM/YYYY   </strong>
                                </section>
                                {
                                    this.state.isWorkshopRegistered ?
                                        <div className={classes.buttonContainer}>
                                            <button disabled='true' className={classes.btnRegister}>Registered!</button>
                                            <button className={classes.btnStatement} onClick={() => this.handleClickViewSchedule()}>View Schedule</button>
                                        </div>
                                        :
                                        <div className={classes.buttonContainer}>
                                            <button className={classes.btnRegister} onClick={() => { this.registerWorkshop(this.props.content._id) }}>Register Now</button>
                                        </div>
                                }
                            </div>
                            :
                            <div className={classes.eventInfo}>
                                <section className={classes.eventInfoData}>
                                    <h1>{this.props.content.eventName}</h1>
                                    <p>{this.props.content.eventDescription}</p>
                                </section>
                                {
                                    this.state.isEventRegistered ?
                                        <div className={classes.buttonContainer}>
                                            <button disabled='true' className={classes.btnRegister} style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>Registered!</button>
                                            <button className={classes.btnStatement} >Problem Statement</button>
                                        </div>
                                        :
                                        <div className={classes.buttonContainer}>
                                            <button className={classes.btnRegister} onClick={() => { this.registerEvent(this.props.content._id) }}>Register Now</button>
                                            <button className={classes.btnStatement} >Problem Statement</button>
                                        </div>
                                }
                            </div>
                    }

                    <div className={classes.eventPrize}>
                        <section className={classes.eventAmount}>
                            {this.props.heading === 'Precula' ?
                                <div className={classes.prizeMoney}>
                                    <p>Registration Fees</p>
                                    <p>Free</p>
                                </div>
                                :
                                <div className={classes.prizeMoney}>
                                    <p>Prizes Worth</p>
                                    <p>{`Rs : ${this.props.content.prize[0].split(',').map(i => Number(i)).reduce((a, b) => a + b, 0)}`}</p>
                                </div>
                            }
                        </section>
                        <section className={classes.eventCoordinators}>
                            {
                                this.props.heading === 'Precula' ?
                                    null
                                    :
                                    this.props.content.eventCoordinator.map((item, pos) => {
                                        return (
                                            <section key={pos} className={classes.coordinatorData}>
                                                <div className={classes.coordinatorDetails}>
                                                    <p>{item.coordinatorName}</p>
                                                    <p>{`+91 ${item.coordinatorPhone}`}</p>
                                                </div>

                                                <img src={`${BASE_API}${item.photo}`} alt='' className={classes.coordinatorImage} />
                                            </section>
                                        )
                                    })
                            }
                        </section>
                    </div>
                </main>
                <Dialog
                    open={this.state.open}
                    keepMounted
                    TransitionComponent={this.Transition}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >

                    {
                        this.state.openTeamDialog ?
                            this.state.addTeam ?
                                <DialogContent>
                                    <DialogTitle id="alert-dialog-slide-title">{"Attention!!"}</DialogTitle>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="userEmail"
                                        label="Enter email of User"
                                        type="email"
                                        fullWidth
                                        onChange={this._handleTextFieldChange}
                                    />
                                </DialogContent> : <DialogContent>
                                    <div className={classes.scheduleName}>
                                        <div>
                                            <DialogContentText>
                                                <strong>Domain Name</strong><br />
                                                <sub>{this.props.heading}</sub>
                                            </DialogContentText>

                                        </div>
                                        <div>
                                            <DialogContentText>
                                                <strong>Competition Name</strong><br />
                                                <sub>{this.props.content.eventName}</sub>
                                            </DialogContentText>
                                        </div>
                                    </div>
                                    <div className={classes.scheduleHeading}>
                                        <strong>My Team</strong>
                                        <hr />
                                        <PersonPlus size={24} cursor='pointer' onClick={() => { this.handleClickAddTeam() }} />
                                    </div>
                                    <div>
                                        <DialogContentText className={classes.sessions}>

                                            <strong>{this.state.completeUser.name}</strong>
                                            <strong>{this.state.completeUser.userId}</strong>
                                            {console.log(this.state.completeUser)}


                                        </DialogContentText>
                                    </div>
                                </DialogContent>

                            :
                            <main>
                                <DialogTitle id="alert-dialog-slide-title">{"Attention!!"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        {this.state.popUpMessage}
                                    </DialogContentText>
                                </DialogContent>
                            </main>

                    }
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            {
                                this.state.positiveAction === 'Log in' ?
                                    <Link to="/signin">{this.state.positiveAction}</Link>
                                    :
                                    this.state.positiveAction
                            }


                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.viewSchedule}
                    keepMounted
                    TransitionComponent={this.Transition}
                    onClose={this.handleClickCloseViewSchedule}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <div className={classes.scheduleName}>
                            <div>
                                <DialogContentText>
                                    <strong>Workshop Name</strong><br />
                                    <sub>{this.props.content.workshopName}</sub>
                                </DialogContentText>

                            </div>
                            <div>
                                <DialogContentText>
                                    <strong>Tenure</strong><br />
                                    <sub>15/07 to 20/07 (5 DAYS)</sub>
                                </DialogContentText>
                            </div>
                        </div>
                        <div className={classes.scheduleHeading}>
                            <strong>Schedule</strong>
                            <hr />
                        </div>
                        <div>
                            {
                                this.state.currentWorkshop.sessions.map(item => {
                                    return (
                                        <DialogContentText>
                                            <div className={classes.sessions}>
                                                <strong>{item.workshopSessionName}</strong>
                                                <sub>{item.dateTime.split('T')[0]}</sub>


                                            </div>
                                        </DialogContentText>

                                    )
                                })
                                // this.state.currentWorkshop.sessions.map(item=>{console.log(item)})
                            }
                            <strong>Note:Attendance on all days is mandatory for Successful completion.</strong>
                        </div>
                    </DialogContent>


                    <DialogActions>
                        <Button onClick={this.handleClickCloseViewSchedule} color="primary">
                            Join WhatsApp Group
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}