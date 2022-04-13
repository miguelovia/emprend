import React from 'react'

export const Logo = (props) => {
    const { size } = props;
    return (
        <div className='logo'>
            <span className={`material-icons material-icons-size-xl color-primary`}>explore</span>
            <span className='size-lg'>&nbsp;EmprenD</span>
        </div>
    )
}
