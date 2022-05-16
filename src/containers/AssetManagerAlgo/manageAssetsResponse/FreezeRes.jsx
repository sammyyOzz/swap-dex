import React from 'react'
import { useSelector } from 'react-redux'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'
import { HTTP_STATUS } from '../../../constants/httpStatus'

function FreezeRes() {
    const { status, error: errorData } = useSelector(state => state.algorand.freeze)
    const error = errorData?.error
    const success = status === HTTP_STATUS.FULFILLED 

    return (
        <ModalResponse
            success={success}
            title={success ? 'success' : 'error'}
            description={
                success 
                ? 'successfully froze asset' 
                : (error || 'something went wrong while trying to freeze asset')
            }
        />
    )
}

export default FreezeRes
