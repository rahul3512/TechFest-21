import React from 'react'
import DomainPage from '../components/Domain/Domain'

function Workshop() {
    var state = {
        name: 'workshops',
        id: ''
    }
    return (
        <div>
            <DomainPage detail={state} />
            {/* <Footer /> */}
        </div>
    )
}

export default Workshop
