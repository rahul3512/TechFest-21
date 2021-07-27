import React from 'react';
// import Slider from '../components/Domains/Slider'
import DomainPage from '../components/Domain/Domain';

function Domain(props) {
    return (
        <div>
            <DomainPage redirectTo={props.location.pathname.split('/domain/')[1]}/>
        </div>
    )
}

export default Domain;
