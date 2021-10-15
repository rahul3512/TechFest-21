import { DialogContent,Dialog, DialogTitle, DialogActions, Button, Slide, TextField } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import { Team, ViewSchedule,Register,AddTeam } from './DifferentDialogs';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});





export const DialogComponent=(props)=>{
    return(
        <Dialog
            open={props.open}
            keepMounted
            TransitionComponent={Transition}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            onClose={props.close}
        >
            {
                props.register?
                <Register close={props.close} popUpMessage={props.data.popUpMessage}/>:null
            }
            {
                props.openTeamDialog?
                <Team data={props.data} close={props.close} update={props.update}/>:null
            }
            {
                props.addTeam?
                <AddTeam data={props.data} close={props.close} />:null
            }
            {
                props.viewSchedule?
                <ViewSchedule data={props.data} close={props.close}/>:null
            }
        </Dialog>
    )
}