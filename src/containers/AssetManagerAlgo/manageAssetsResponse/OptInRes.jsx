import React from 'react'
import { useSelector } from 'react-redux'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'
import { HTTP_STATUS } from '../../../constants/httpStatus'

function OptInRes() {
    const { status, error: errorData } = useSelector(state => state.algorand.optIn)
    const error = errorData?.error
    const success = status === HTTP_STATUS.FULFILLED 

    return (
        <ModalResponse
            success={success}
            title={success ? 'success' : 'error'}
            description={
                success 
                ? 'successfully added asset' 
                : (error || 'something went wrong while trying to add asset')
            }
        />
    )
}

export default OptInRes
