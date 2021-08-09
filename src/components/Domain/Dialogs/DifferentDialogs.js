import React, { useRef } from 'react'
import { DialogContent,Dialog, DialogTitle, DialogActions, Button, Slide, TextField, DialogContentText } from '@material-ui/core'
import classes from './Dialogs.module.css'
import { PersonPlus } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

export const Register=(props)=>{
    return(
        <div>
            <DialogTitle id="alert-dialog-slide-title">{"Attention!!"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {'Registration Successful'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{props.close('register')}} color='primary'>
                    OK
                </Button>
            </DialogActions>
        </div>
    );
}

export const AddTeam=(props)=>{
    const textinput=useRef();

    return (
        <main>
            <DialogContent>
            <DialogTitle id="alert-dialog-slide-title">Add Team</DialogTitle>
            <TextField
                autoFocus
                margin="dense"
                id="userEmail"
                label="Enter email of User"
                type="email"
                fullWidth
                inputRef={textinput}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>props.close()} color="primary">
                        Cancel
            </Button>
            {/* onClick={()=>{props.close('addTeamMember')}} */}
            <Button onClick={()=>{props.close('addTeamMember',textinput.current.value)}} color='primary'>
                Add Team Member
            </Button>   
            </DialogActions>
        </main>
        
    )
}

export const Team=(props)=>{
    return(
        <div>
            <DialogContent>
                <div className={classes.scheduleName}>
                    <div>
                        <DialogContentText>
                            <strong>Domain Name</strong><br />
                            <sub>{props.data.domainName}</sub>
                        </DialogContentText>

                    </div>
                    <div>
                        <DialogContentText>
                            <strong>Competition Name</strong><br />
                            <sub>
                                {
                                    props.data.event.eventName
                                }
                                
                            </sub>
                        </DialogContentText>
                    </div>
                </div>
                <div className={classes.scheduleHeading}>
                    <strong>My Team</strong>
                    <hr style={{width:'60%'}}/>
                    <PersonPlus size={24} cursor={'pointer'} onClick={()=>props.close('openAddTeam')}/>
                </div>
                <div>
                {
                        props.data.myTeam.map((item,pos) => {
                            return (
                                <DialogContentText key={pos} className={classes.sessions}>
                                        <strong>{item.name}</strong>
                                        <sub>{item.id}</sub>
                                </DialogContentText>

                            )
                        })
                        // this.state.currentWorkshop.sessions.map(item=>{console.log(item)})
                    }
                </div>
            </DialogContent>
            <DialogActions>
                    <Button color='primary' onClick={()=>{props.close('confirmTeam')}}>Confirm Registration</Button>
            </DialogActions>                
        </div>
        
    )
}

const getDate=(date) =>{
    return (new Date(date))
}

const getDifference= (startDate,endDate)=>{
    return( Math.ceil( Math.abs(endDate-startDate)/(1000*60*60*24) ) );
}

export const ViewSchedule=(props)=>{
    return(
        <div>
            <DialogContent>
                <div className={classes.scheduleName}>
                    <div>
                        <DialogContentText>
                            <strong>Workshop Name</strong><br />
                            <sub>{props.data.content.workshopName}</sub>
                        </DialogContentText>

                    </div>
                    <div>
                        <DialogContentText>
                            <strong>Tenure</strong><br />
                            
                                {
                                    props.data.content.startDate && props.data.content.endDate?
                                     
                                    <sub>{
                                            `${JSON.stringify(getDate(props.data.content.startDate).getDate()-1)}/${JSON.stringify(getDate(props.data.content.startDate).getMonth()+1)} to ${JSON.stringify(getDate(props.data.content.endtDate).getDate()-1)}/${JSON.stringify(getDate(props.data.content.endtDate).getMonth()+1)} (${getDifference(getDate(props.data.content.startDate),getDate(props.data.content.endDate))}DAYS)`
                                        }
                                    </sub>
                                    :
                                    <sub>15/07 to 20/07 (5 DAYS)</sub>
                                }
                                
                            
                        </DialogContentText>
                    </div>
                </div>
                <div className={classes.scheduleHeading}>
                    <strong>Schedule</strong>
                    <hr />
                </div>
                <div>
                    {
                        props.data.sessions.map(item => {
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
                    <Link to={props.data.content.whatsappGroupLink?props.data.content.whatsappGroupLink:'/'} target='_blank' rel='noopener' component={Button} style={{color:'darkBlue'}} onClick={()=>{props.close('schedule')}}>Join Telegram Group</Link>
            </DialogActions>                
        </div>
    )
}