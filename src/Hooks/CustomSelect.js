import { useState } from 'react'

const defaultValues = {
    initializeAsFilled : { id: 0, name: 'Algorand', amount: 0, unit: 'Algo' },
    initializeAsEmpty: ""
}

function useCustomSelect(key) {
    const [selectedItem, setSelectedItem] = useState(defaultValues[key])

    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

    const toggleDropdownIsOpen = () => setDropdownIsOpen(prevState => !prevState)

    return {
        selectedItem,
        setSelectedItem,
        dropdownIsOpen,
        setDropdownIsOpen,
        toggleDropdownIsOpen,
    }
}

export default useCustomSelect