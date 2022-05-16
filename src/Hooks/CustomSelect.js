import { useState } from 'react'

const defaultValues = {
    initializeAsFilled : { TokenId: 0, Pair: 'Hbar', name: 'Hbar', amount: 0, unit: 'Hbar' },
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