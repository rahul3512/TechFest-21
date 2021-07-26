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
import Slide from '@material-ui/core/Slide';
import { Link } from 'react-router-dom';


export class ExploreEvents extends Component{

    constructor(props){
        super(props);
        
    }

    state={
        user:isAuthenticated().user,
        token:isAuthenticated().token,
        isRegistered:false,
        currentWorkshop:{},
        open:false,
        popUpMessage:'',
        positiveAction:'',
        completeUser : null,
    }

    getUser = (userId, token) => {
        return fetch(`${API}/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
    
                Authorization: `Bearer ${token}`
            },
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    };
    
    componentDidMount(){
        this.getUser(this.state.user._id, this.state.token).then((data) => {
            if (data.error) {
                // setValues({ ...values, error: data.error });
                console.log(data.error);
            } else {
                this.setState({completeUser:data})
                // setCompleteUser(data)
                
            }
        });
        console.log(this.state.completeUser)
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

    getWorkshop = (WorkshopId) => {
        return fetch(`${API}/workshop/${WorkshopId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
    
            },
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    };

    loadWorkshop = (workshopId) => {
        this.getWorkshop(workshopId).then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                this.setState({currentWorkshop:data})
            }
        });
    };

    registerInWorkshop = (userId, token, workshopId) => {

        console.log(`userId:${userId},tokenId:${token},workshop id : ${workshopId}`);
        return fetch(`${API}/user/${userId}/workshop/${workshopId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    };
 
    registerWorkshop = (workshopId) => {
        this.handleClickOpen();
        if(!this.state.user){
            var status = !this.state.user
            console.log(status)
            this.setState({popUpMessage:'You are not Logged in. Please Log in first',positiveAction:'Log in'})
        }else{
            this.registerInWorkshop(this.state.user._id, this.state.token, workshopId).then(
                data => {
                    console.log(data)
                    if (data.error) {
                        console.log(data.error)
                        this.setState({popUpMessage:data.error,positiveAction:'OK'})
                    } else {
                        console.log("registered success")
                        this.setState({isRegistered:true,popUpMessage:'Registration Successful',positiveAction:'OK'})
                    }
                }
            ).catch(err => {
                console.log(err)
                this.setState({isRegistered:false,popUpMessage:err,positiveAction:'OK'})
            })
        }
        
    }

    render(){
        return(
            <div className={classes.eventContainer}>
                <hr/>
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
                                this.state.isRegistered?
                                    <span>
                                        <button disabled='true' className={classes.btnRegister}>Registered!</button>
                                        <button className={classes.btnStatement}>View Schedule</button>
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
                            <span>
                                <button className={classes.btnRegister}>Register Now</button>
                                <button className={classes.btnStatement}>Problem statement</button>
                            </span>
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
                        
                        {/* <div className={classes.coordinatorContainer}>
                            { {props.content.eventCoordinator.map(item=>{
                                return(
                                    <div className={classes.coordinator}>
                                    <div className={classes.coordinatorDetails}>
                                        <p>{item.coordinatorName}</p>
                                        <p>{`+91 ${item.coordinatorPhone}`}</p>
                                    </div>
                                <img src={`${BASE_API}${item.photo}`} alt='' className={classes.coordinatorImage}/>
                                </div>
                                )
                            })}  }
                            
                        </div> */}
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
            </div>
        )
    }
}