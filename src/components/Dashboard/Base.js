import React from 'react'
import Menu from './Menu'

function Base({
    title = "Home",
    children
}) {
    return (
        <div style={{ backgroundColor: "grey" }}>
            <Menu></Menu>
            <h1>{title}</h1>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Base
