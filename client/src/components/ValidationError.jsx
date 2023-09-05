import React, { Fragment } from 'react'

const ValidationError = ({error}) => {
    return (
        <Fragment>
            <p className='text-sm mt-1' style={{ color : 'red' }}>{error}</p>
        </Fragment>
    )
}

export default ValidationError