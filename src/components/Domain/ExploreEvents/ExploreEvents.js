import React, { Component } from 'react'
import classes from './exploreEvents.module.css'
import { API, BASE_API } from '../../../Utils/backend';
import {Calendar, Clock} from 'react-bootstrap-icons'
import {isAuthenticated} from '../../../auth/helper/index.js'
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
import { getWorkshop, registerInEvent, registerInWorkshop } from '../../../auth/helper/DomainRegistration';


export class ExploreEvents extends Component{

    constructor(props){
        super(props);
    }

    state={
        user:isAuthenticated().user,
        token:isAuthenticated().token,
        isWorkshopRegistered:false,
        currentWorkshop:{
            sessions:[]
        },
        open:false,
        popUpMessage:'',
        positiveAction:'',
        completeUser : null,
        viewSchedule:false,
        isEventRegistered:false
    }

    getUserData=()=>{
        if(this.state.completeUser === null){
            getUser(this.state.user._id, this.state.token).then((data) => {
                console.log(`GET USER DATA:`);
                console.log(data)
                if (data.error) {
                    // setValues({ ...values, error: data.error });
                    console.log(data.error);
                } else {
                    this.setState({completeUser:data})
                    if(data.workshopsEnrolled.length>0){
                        data.workshopsEnrolled.map(item=>{
                            if(this.props.id === item._id){
                                this.setState({isWorkshopRegistered:true})
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

    handleClickOpen=()=>{
        this.setState({open:true})
    }
    handleClose=()=>{
        this.setState({open:false})
    }
    handleClickViewSchedule=()=>{
        this.loadWorkshop(this.props.id)
        this.setState({viewSchedule:true})
    }
    handleClickCloseViewSchedule=()=>{
        this.setState({viewSchedule:false})
    }

    

    loadWorkshop = (workshopId) => {
        getWorkshop(workshopId).then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                this.setState({currentWorkshop:data})
                console.log(data)
            }
        });
    };

    
    registerWorkshop = (workshopId) => {
        this.handleClickOpen();
        if(!this.state.user){
            var status = !this.state.user
            console.log(status)
            this.setState({popUpMessage:'You are not Logged in. Please Log in first',positiveAction:'Log in'})
        }else{
            registerInWorkshop(this.state.user._id, this.state.token, workshopId).then(
                data => {
                    console.log(data)
                    if (data.error) {
                        console.log(data.error)
                        this.setState({popUpMessage:data.error,positiveAction:'OK'})
                    } else {
                        console.log("registered success")
                        this.setState({isWorkshopRegistered:true,popUpMessage:'Registration Successful',positiveAction:'OK'})
                    }
                }
            ).catch(err => {
                console.log(err)
                this.setState({isWorkshopRegistered:false,popUpMessage:err,positiveAction:'OK'})
            })
        }
            
    }

    registerEvent = (eventId) => {
        this.handleClickOpen();
        if(!this.state.user){
            var status = !this.state.user
            console.log(status)
            this.setState({popUpMessage:'You are not Logged in. Please Log in first',positiveAction:'Log in'})
        }else{
            registerInEvent(this.state.user._id, this.state.token, eventId).then(
                data => {
                    console.log(data)
                    if (data.error) {
                        console.log(data.error)
                        this.setState({popUpMessage:data.error,positiveAction:'OK'})
                    } else {
                        console.log("registered success")
                        this.setState({isEventRegistered:true,popUpMessage:'Registration Successful',positiveAction:'OK'})
                    }
                }
            ).catch(err => {
                console.log(err)
                this.setState({isEventRegistered:false,popUpMessage:err,positiveAction:'OK'})
            })
        }
    }
    render(){
        return(
            <div id={this.props.id} className={classes.eventContainer}>
                {this.state.user?this.getUserData():null}
                <hr className={classes.divider}/>
                <div className={classes.eventContent}>
                    <div className={classes.eventImage}>
                        <div className={classes.eventImageContainer}>
                            <img src={`${BASE_API}${this.props.content.photo}`} alt=''/>
                        </div>
                        {
                            this.props.heading === 'Precula'?
                            <div className={classes.eventDeadline}>
                                <Calendar color='white' size={16}/>
                                <p>Register Before : </p>
                                <Clock color='white' size={16}/>
                                <p>Time : </p>
                            </div>
                            :
                            <div className={classes.eventDeadline}>
                                <Calendar color='white' size={16}/>
                                <p>{`Register Before : ${this.props.content.regEndDate.split('T')[0]}`}</p>
                                <Clock color = 'white' size={16}/>
                                <p>{`${this.props.content.regEndDate.split('T')[1].split('.')[0]}`}</p> 
                            </div>
                        }
                    </div>
                    {
                        this.props.heading === 'Precula'?
                        <div className={classes.eventInfo}>
                            <div className={classes.text}>
                                <h1>{this.props.content.workshopName}</h1>
                                <p>
                                    {this.props.content.workshopDescription}
                                </p>
                            </div>
                            {
                                this.state.isWorkshopRegistered?
                                    <span>
                                        <button disabled='true' className={classes.btnRegister}>Registered!</button>
                                        <button className={classes.btnStatement} onClick={()=>this.handleClickViewSchedule()}>View Schedule</button>
                                    </span>
                                    :
                                    <span>
                                        <button className={classes.btnRegister} onClick={()=>{this.registerWorkshop(this.props.content._id)}}>Register Now</button>
                                    </span>
                            }
                        </div>
                        :
                        <div className={classes.eventInfo}>
                            <div className={classes.text}>
                                <h1>{this.props.content.eventName}</h1>
                                <p>
                                    {this.props.content.eventDescription}
                                </p>
                            </div>
                            {
                                this.state.isEventRegistered?
                                    <span>
                                        <button disabled='true' className={classes.btnRegister}>Registered!</button>
                                        <button className={classes.btnStatement} >Problem Statement</button>
                                    </span>
                                    :
                                    <span>
                                        <button className={classes.btnRegister} onClick={()=>{this.registerEvent(this.props.content._id)}}>Register Now</button>
                                        <button className={classes.btnStatement} >Problem Statement</button>
                                    </span>
                            }
                        </div>
                    }
                    <div className={classes.eventPrize}>
                        {this.props.heading === 'Precula'? 
                            <div className={classes.prizeMoney}>
                                <p>Registration Fees</p>
                                <p>Free</p>
                            </div>
                            :
                            <div className={classes.prizeMoney}>
                                <p>Prizes Worth</p>
                                <p>{`Rs : ${this.props.content.prize[0].split(',').map(i=>Number(i)).reduce((a,b)=>a+b,0)}` }</p>
                            </div>
                            }
                        
                        {
                            this.props.heading === 'Precula'?
                            null
                            :
                             <div className={classes.coordinatorContainer}>
                            { this.props.content.eventCoordinator.map(item=>{
                                return(
                                    <div className={classes.coordinator}>
                                    <div className={classes.coordinatorDetails}>
                                        <p>{item.coordinatorName}</p>
                                        <p>{`+91 ${item.coordinatorPhone}`}</p>
                                    </div>
                                <img src={`${BASE_API}${item.photo}`} alt='' className={classes.coordinatorImage}/>
                                </div>
                                )
                            })}  
                            
                            </div> 
                        }
                        
                    </div>
                </div>
                <Dialog
                    open={this.state.open}
                    keepMounted
                    TransitionComponent={this.Transition}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Attention!!"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {this.state.popUpMessage}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            {
                                this.state.positiveAction==='Log in'?
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
                                    <b>Workshop Name</b>
                                    <p>{this.props.content.workshopName}</p>
                                </DialogContentText>
                                
                            </div>
                            <div>
                                <DialogContentText>
                                    <b>Tenure</b>
                                    <p>15/07 to 20/07 (5 DAYS)</p>
                                </DialogContentText>
                            </div>
                        </div>
                        <div className={classes.scheduleHeading}>
                            <b>Schedule</b>
                            <hr/>
                        </div>
                        <div>
                            {
                                this.state.currentWorkshop.sessions.map(item=>{
                                    return(
                                        <DialogContentText>
                                            <div className={classes.sessions}>
                                                <p>{item.workshopSessionName}</p>
                                                <p>{item.dateTime.split('T')[0]}</p>
                                                
                                                
                                            </div>        
                                        </DialogContentText>
                                        
                                    )
                                })
                                // this.state.currentWorkshop.sessions.map(item=>{console.log(item)})
                            }
                            <b>Note:Attendance on all days is mandatory for Successful completion.</b>
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