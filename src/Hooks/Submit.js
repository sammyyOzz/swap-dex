import { useDispatch } from 'react-redux'
import { hideBackdrop, showBackdrop } from '../app/backdrop/backdropSlice'

function useSubmit() {
    const dispatch = useDispatch()

    const handleSubmit = (submitData, nextAction, handleError) => {
        dispatch(showBackdrop())

        dispatch(submitData)
        .unwrap()
        .then((res) => {
            dispatch(hideBackdrop())
            if (nextAction) {
                nextAction(res)
            }
        })
        .catch((err) => {
            dispatch(hideBackdrop())
            if (handleError) {
                handleError(err)
            }
        })
    }

    return {
        handleSubmit
    }
}

export default useSubmit