import React from 'react';
// import Slider from '../components/Domains/Slider'
import DomainPage from '../components/Domain/Domain';

function Domain(props) {
    var state = props.location.state;
    if (state == undefined) {
        state = { name : 'none' }
    }
    return (
        <div>
            
            <DomainPage detail={state}/>
        </div>
    )
}

export default Domain;
