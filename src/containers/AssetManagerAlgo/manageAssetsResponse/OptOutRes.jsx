import React from 'react'
import { useSelector } from 'react-redux'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'
import { HTTP_STATUS } from '../../../constants/httpStatus'

function OptOutRes() {
    const { status, error: errorData } = useSelector(state => state.algorand.optOut)
    const error = errorData?.error
    const success = status === HTTP_STATUS.FULFILLED 

    return (
        <ModalResponse
            success={success}
            title={success ? 'success' : 'error'}
            description={
                success 
                ? 'successfully removed asset' 
                : (error || 'something went wrong while trying to remove asset')
            }
        />
    )
}

export default OptOutRes
