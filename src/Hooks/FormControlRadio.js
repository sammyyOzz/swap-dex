import { useState } from 'react'

function useFormControlRadio(defaultValue = "") {
    const [value, setValue] = useState(defaultValue)

    const handleClick = (data) => {
        setValue(data)
    }

    return {
        value,
        handleClick
    }
}

export default useFormControlRadio