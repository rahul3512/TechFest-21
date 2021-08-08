import React, { Component } from 'react'
import classes from './exploreEvents.module.css'
import { BASE_API } from '../../../Utils/backend';
import { Calendar, Clock, PersonPlus } from 'react-bootstrap-icons'
import { isAuthenticated } from '../../../auth/helper/index.js'
import { Link } from 'react-router-dom';
import { getUser } from '../../Dashboard/user/helper/userapicalls';
import { createTeam, getWorkshop, registerInEvent, registerInEventAsTeam, registerInWorkshop } from '../../../auth/helper/DomainRegistration';
import { Snackbar } from '@material-ui/core';
import { Alert } from '../Alert';
import { DialogComponent } from '../Dialogs/Dialog';


export class ExploreEvents extends Component {

    constructor(props) {
        super(props);
        this.dialog=React.createRef();
    }

    state = {
        user: isAuthenticated().user,
        token: isAuthenticated().token,
        isWorkshopRegistered: false,
        currentWorkshop: {
            sessions: []
        },
        dialog:{
            open:false,
            register:false,
            openTeamDialog:false,
            viewSchedule:false,
            addTeam:false,
            data:{},
            popUpMessage:'',
            positiveAction:'',
        },
        myTeam:[],
        completeUser: null,
        isEventRegistered: false,
        memberId: '',
        openSnackbar: false,
        error: '',
        name:''
    }


    getUserData = () => {
        if (this.state.completeUser === null) {
            if (this.state.user) {
                getUser(this.state.user._id, this.state.token).then((data) => {
                    if (data.error) {
                        // setValues({ ...values, error: data.error });
                        this.setState({ openSnackbar: true, error: data.error })
                        
                    } else {
                        this.setState({ completeUser: data, })
                        let userInfo={
                            name:data.name,
                            id:data.userId
                        }
                        this.updatemyTeam(userInfo)
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

    }

    

    isDuplicate = (data, obj) =>
    data.some((el) =>
        Object.entries(obj).every(([key, value]) => value === el[key])
    );

// HANDLERS
    handleClickOpen = (dialogType) => {
        this.setState(prevState=>({
            dialog:{
                ...prevState.dialog,
                open:true
            },
        }))
        switch(dialogType){
            case 'schedule':
                this.handleClickViewSchedule();
                break;           
            case 'registerForWorkshop':
            case 'registerForEvent':
                this.handleRegisterOpen()
                break;
            default:
                console.log('DEFAULT BLOCK') 
        }
        
    }
    handleClose = (dialogType,memberId=null) => {
        switch(dialogType){
            case 'register':
                this.handleRegisterClose()
                break;
            case 'schedule':
                this.handleClickCloseViewSchedule()
                break;
            case 'openAddTeam':
                this.handleClickAddTeam()
                break;
            case 'addTeamMember':
                this.getMemberId(memberId,this.state.token,this.props.content._id)
                break;
            case 'confirmTeam':
                this.confirmTeamRegistration()
                break;
            default:
                this.setState({
                    dialog:{
                        open:false,
                        register:false,
                        openTeamDialog:false,
                        viewSchedule:false,
                        addTeam:false,
                        data:{},
                        popUpMessage:'',
                        positiveAction:'',      
                    }
                })

        }   
    }
    handleRegisterOpen=()=>{
        this.setState(prevState=>({
            dialog:{
                ...prevState.dialog,
                openTeamDialog:false,
                register:true,
            }
        }))
    }
    handleRegisterClose=()=>{
        this.setState(prevState=>({
            dialog:{
                ...prevState.dialog,
                register:false,
                open:false
            }
        }))
    }
    updatemyTeam=(obj)=>{
        if(!this.isDuplicate(this.state.myTeam,obj)){
            this.setState(prevState=>({
                myTeam:[...prevState.myTeam,obj]
            }))
        }
        
    }
    handleOpenTeamDialog = (obj) => {
        this.updatemyTeam(obj)
        this.setState(prevState=>({
            dialog:{
                ...prevState.dialog,
                openTeamDialog:true,
                open:true,
                data:{
                    domainName:this.props.heading,
                    event:this.props.content,
                    myTeam:this.state.myTeam
                },
                
            },
            
        }))
    }
    handleClickViewSchedule = () => {
        this.loadWorkshop(this.props.id)
    }    
    handleClickCloseViewSchedule = () => {
        this.setState(prevState=>({
            dialog:{
                ...prevState.dialog,
                viewSchedule:false,
                open:false
            }
        }))
    }
    handleClickAddTeam = () => {
        this.setState(prevState=>({
            dialog:{
                ...prevState.dialog,
                openTeamDialog:false,
                addTeam:true,
            }
        }))
    }
    handleCloseTeam=()=>{
        this.setState(prevState=>({
            dialog:{
                ...prevState.dialog,
                addTeam:false
            }
        }))
    }
    handleTextFieldChange = (e) => {
        
        // this.setState({ memberId: e.target.value })
    }
    handleCloseTeamDialog=()=>{
        this.setState({
            open:false,
            openTeamDialog:false
        })
    }
    closeSnackbar = () => {
        this.setState({ openSnackbar: false })
    }

    getMemberId=(emailId,token,eventId)=>{
        registerInEventAsTeam(emailId,token,eventId)
        .then(response=>{
            if(response.statusCode!=400){
                const obj={
                    name:response.data.name,
                    id:response.data.userId
                }
            this.handleCloseTeam()
            this.handleOpenTeamDialog(obj)
            }else{
                this.setState({openSnackbar:true,error:response.error})
            }
        }).catch(err=>{
            this.setState({openSnackbar:true,error:err})
        })
    }
    confirmTeamRegistration=()=>{
        let teamId=[]
        this.state.myTeam.map(item=>teamId.push(item.id))
        
        createTeam(this.state.token,teamId,this.props.content._id,this.props.content.participantCountMax,this.state.completeUser.userId)
        .then(response=>{
            this.handleCloseTeamDialog()
            this.handleRegisterOpen()
            if(response.statusCode == 400){
                this.setState({openSnackbar:true,error:response.error})
            }
        }).catch(err=>{
            this.setState({openSnackbar:true,error:err})
        })
    }


    loadWorkshop = (workshopId) => {
        getWorkshop(workshopId).then(response => {
            if (response.error) {
                this.setState({ error: response.error, openSnackbar: true });
            } else {
                
                this.setState(prevState=>({
                    currentWorkshop:response,
                    dialog:{
                        ...prevState.dialog,
                        viewSchedule:true,
                        data:{
                            content:this.props.content,
                            sessions:response.sessions
                        }
                    }

                }))
            }
        }).catch(err=>{
            this.setState({ error: err, openSnackbar: true });
        });
    };


    registerWorkshop = (workshopId) => {

        // this.handleClickOpen();
        if (!this.state.user) {
            this.setState({ error: 'You are not Logged in. Please Log in first', openSnackbar: true })
        } else {
            registerInWorkshop(this.state.user._id, this.state.token, workshopId).then(
                data => {

                    if (data.error) {
                        
                        this.setState({ error: data.error, openSnackbar: true })
                    } else {
                        this.handleClickOpen('registerForWorkshop')
                        this.setState(prevState=>({
                            isWorkshopRegistered:true,
                            dialog:{
                                ...prevState.dialog,
                                popUpMessage:"Registration Successful",
                                positiveAction:'OK'
                            }
                        }))
                        
                    }
                }
            ).catch(err => {
                this.setState({ isWorkshopRegistered: false, error: err, openSnackbar: true })
            })
        }

    }

    componentDidMount = () => {
        this.getUserData()
    }

    



    registerEvent = (eventId) => {
        if (!this.state.user) {
            this.setState({ error: 'You are not Logged in. Please Log in first', openSnackbar: true })
        } else {
            
            {
                this.props.content.participantCountMax > 1 ? this.handleOpenTeamDialog(this.state.myTeam[0])
                    :
                    registerInEvent(this.state.user._id, this.state.token, eventId).then(
                        data => {
                            if (data.error) {
                                this.setState({ error: data.error, openSnackbar: true })
                            } else {
                                this.handleClickOpen('registerForEvent');
                                this.setState(prevState=>({
                                    isEventRegistered:true,
                                    dialog:{
                                        ...prevState.dialog,
                                        popUpMessage:'Registration Succesful',
                                        positiveAction:'OK'
                                    }
                                }))
                            }
                        }
                    ).catch(err => {
                        
                        this.setState({ isEventRegistered: false, error: err, openSnackbar: true })
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
                            this.props.heading === 'Precuela' ?
                                null
                                // <div className={classes.eventDeadline}>
                                //     {console.log(this.props)}
                                //     <Calendar color='white' size={16} />
                                //     <p>{`Register Before : `} </p>
                                //     <Clock color='white' size={16} />
                                //     <p>{`Time : `}</p>
                                // </div>
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
                        this.props.heading === 'Precuela' ?
                            <div className={classes.eventInfo}>
                                <section className={classes.eventInfoData}>
                                    <h1>{this.props.content.workshoptName}</h1>
                                    <p>{this.props.content.workshopDescription}</p>
                                    
                                    <strong>{`Start Date : ${this.props.content.startDate?this.props.content.startDate.split('T')[0]:null}`}   </strong><br />
                                    <strong>{`End Date : ${this.props.content.endDate?this.props.content.endDate.split('T')[0]:null}`}   </strong>
                                </section>
                                {
                                    this.state.isWorkshopRegistered ?
                                        <div className={classes.buttonContainer}>
                                            <button disabled={true} className={classes.btnRegister} style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>Registered!</button>
                                            <button className={classes.btnStatement} name={'schedule'} ref={this.dialog} onClick={() => this.handleClickOpen('schedule')}>View Schedule</button>
                                        </div>
                                        :
                                        <div className={classes.buttonContainer}>
                                            <button className={classes.btnRegister} name={'registerForWorkshop'} ref={this.dialog} onClick={() => { this.registerWorkshop(this.props.content._id) }}>Register Now</button>
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
                                            <button disabled={true} className={classes.btnRegister} style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>Registered!</button>
                                            <button className={classes.btnStatement} onClick={()=>{window.open(this.props.content.eventLink,'_blank')}}>Problem Statement</button>
                                        </div>
                                        :
                                        <div className={classes.buttonContainer}>
                                            {console.log(this.props.content)}
                                            <button className={classes.btnRegister} name={'registerForEvent'} ref={this.dialog} onClick={() => { this.registerEvent(this.props.content._id) }}>Register Now</button>
                                            <button className={classes.btnStatement} onClick={()=>{window.open(this.props.content.eventLink,'_blank')}}>Problem Statement</button>
                                        </div>
                                }
                            </div>
                    }

                    <div className={classes.eventPrize}>
                        <section className={classes.eventAmount}>
                            {this.props.heading === 'Precuela' ?
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
                                this.props.heading === 'Precuela' ?
                                    this.props.content.studentCoordinator.map((item, pos) => {
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
                    
                <DialogComponent  
                    open={this.state.dialog.open} 
                    close={this.handleClose} 
                    openTeamDialog={this.state.dialog.openTeamDialog}
                    addTeam={this.state.dialog.addTeam} 
                    register={this.state.dialog.register}
                    viewSchedule={this.state.dialog.viewSchedule}
                    popUpMessage={this.state.dialog.popUpMessage}
                    data={this.state.dialog.data}
                    positiveAction={this.state.dialog.positiveAction}
                />
                <Snackbar open={this.state.openSnackbar} autoHideDuration={6000} onClose={this.closeSnackbar}>
                    <Alert 
                        onClose={this.closeSnackbar} 
                        severity="error"
                        action={
                            !this.state.user?
                            <Link style={{color:'cyan'}}  to="/signin">LogIn</Link>:null}
                    >
                        {this.state.error}
                    </Alert>
                </Snackbar>

            </div>
        )
    }
}