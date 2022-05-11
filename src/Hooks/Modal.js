import { useState } from 'react'

function useModal() {
    const [modalState, setModalState] = useState(false)

    const handleModalOpen = () => {
        setModalState(true)
    }

    const handleModalClose = () => {
        setModalState(false)
    }

    return {
        modalState,
        handleModalOpen,
        handleModalClose
    }
}

export default useModal