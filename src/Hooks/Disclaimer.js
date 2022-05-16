import { useState } from 'react'

function useDisclaimer() {
    const [checkbox, setCheckbox] = useState(false)
    const [modalContentStatus, setModalContentStatus] = useState('default')

    const toggleCheckbox = () => {
        setCheckbox(prevState => !prevState)
    }

    const handleModalStatus = (modalStatus) => {
        setModalContentStatus(modalStatus)
    }

    return {
        checkbox,
        modalContentStatus,
        toggleCheckbox,
        handleModalStatus
    }
}

export default useDisclaimer