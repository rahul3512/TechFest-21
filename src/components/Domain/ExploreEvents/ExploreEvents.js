import React from 'react'
import classes from './exploreEvents.module.css'
import { BASE_API } from '../../../Utils/backend';
import {Calendar, Clock} from 'react-bootstrap-icons'
import { CalendarViewDayRounded } from '@material-ui/icons';


const getSingleWorkshop=(id)=>{

}

export const ExploreEvents=(props)=>{
    return(
        <div className={classes.eventContainer}>
            <hr/>
            <div className={classes.eventContent}>
                <div className={classes.eventImage}>
                    <div className={classes.eventImageContainer}>
                        <img src={`${BASE_API}${props.content.photo}`} alt=''/>
                    </div>
                    <div className={classes.eventDeadline}>
                        
                        {/* <Calendar color='white'/>
                        <p>{`Register Before : ${props.content.regEndDate.split('T')[0]}`}</p>
                        <Clock color='white'/>
                        <p>{`${props.content.regEndDate.split('T')[1].split('.')[0]}`}</p> */}
                        
                        {console.log(props.heading)}
                    </div>
                </div>
                {
                    props.heading == 'Precula'?
                    <div className={classes.eventInfo}>
                        <div className={classes.text}>
                            <h1>{props.content.workshopName}</h1>
                            <p>
                                {props.content.workshopDescription}
                            </p>
                        </div>
                        <span>
                            <button 
                                className={classes.btnRegister} 
                                onClick={()=>{
                                    console.log(props.content._id)
                                }
                            }>Register Now</button>
                            <button className={classes.btnStatement}>View Schedule</button>
                        </span>
                    </div>
                    :
                    <div className={classes.eventInfo}>
                        <div className={classes.text}>
                            <h1>{props.content.eventName}</h1>
                            <p>
                                {props.content.eventDescription}
                            </p>
                        </div>
                        <span>
                            <button className={classes.btnRegister}>Register Now</button>
                            <button className={classes.btnStatement}>Problem statement</button>
                        </span>
                    </div>
                }
                <div className={classes.eventPrize}>
                    {props.heading == 'Precula'? 
                        <div className={classes.prizeMoney}>
                            <p>Registration Fees</p>
                            <p>Free</p>
                        </div>
                        :
                        <div className={classes.prizeMoney}>
                            <p>Prizes Worth</p>
                            <p>{`Rs : ${props.content.prize[0].split(',').map(i=>Number(i)).reduce((a,b)=>a+b,0)}` }</p>
                        </div>
                        }
                    
                    <div className={classes.coordinatorContainer}>
                        {/* {props.content.eventCoordinator.map(item=>{
                            return(
                                <div className={classes.coordinator}>
                                <div className={classes.coordinatorDetails}>
                                    <p>{item.coordinatorName}</p>
                                    <p>{`+91 ${item.coordinatorPhone}`}</p>
                                </div>
                            <img src={`${BASE_API}${item.photo}`} alt='' className={classes.coordinatorImage}/>
                            </div>
                            )
                        })}  */}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}