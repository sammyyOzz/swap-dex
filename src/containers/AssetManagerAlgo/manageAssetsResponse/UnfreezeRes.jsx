import React from 'react'
import { useSelector } from 'react-redux'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'
import { HTTP_STATUS } from '../../../constants/httpStatus'

function UnfreezeRes() {
    const { status, error: errorData } = useSelector(state => state.algorand.unfreeze)
    const error = errorData.error
    const success = status === HTTP_STATUS.FULFILLED 

    return (
        <ModalResponse
            success={success}
            title={success ? 'success' : 'error'}
            description={
                success ? 'successfully unfroze asset' : 'something went wrong while trying to unfreeze asset'
            }
        />
    )
}

export default UnfreezeRes
