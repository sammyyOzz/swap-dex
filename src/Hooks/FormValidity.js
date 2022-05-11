import { useEffect, useState } from 'react'

function useFormValidity(...args) {
    const [formIsValid, setFormIsValid] = useState(false)

    useEffect(() => {
        const inputRateTimer = setTimeout(() => {
            if (args.every(input => (input.toString().trim().length > 0) && (input.toString().trim() !== '0'))) {
                setFormIsValid(true)
            } else {
                setFormIsValid(false)
            }
        }, 500)

        return(() => {
            clearTimeout(inputRateTimer)
        })
    }, [args])

    return {
        formIsValid
    }
}

export default useFormValidity