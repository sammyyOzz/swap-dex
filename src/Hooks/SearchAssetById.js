import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HTTP_STATUS } from '../constants/httpStatus'

function useSearchAssetById(inputValue, dataToDispatch, action) {
    const dispatch = useDispatch()
    const { data: holdings } = useSelector(state => state.algorand.holdings)
    const [status, setStatus] = useState(null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const inputRateTimer = setTimeout(() => {
            if (inputValue.length > 0) {

                holdings.forEach(item => {
                    if ((item.id === inputValue) && (item.id !== 0)) {
                        setData(item)
                        setStatus(HTTP_STATUS.FULFILLED)
                    } else {
                        setStatus(HTTP_STATUS.PENDING)
                        dispatch(action(dataToDispatch))
                        .unwrap()
                        .then((res) => {
                            setData(res)
                            setStatus(HTTP_STATUS.FULFILLED)
                        })
                        .catch((err) => {
                            setError(err)
                            setStatus(HTTP_STATUS.REJECTED)
                        })
                    }
                })

                
            }
        }, 1000)

        return(() => {
            clearTimeout(inputRateTimer)
            // dispatch(action(dataToDispatch)).abort()
        })
    }, [inputValue])

    return { status, data, error }
}

export default useSearchAssetById



export function useSearchAssetByIdCompare(inputValue, dataToDispatch, action, compareType) {
    const dispatch = useDispatch()
    const { data: holdings } = useSelector(state => state.algorand.holdings)
    const [status, setStatus] = useState(null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const inputRateTimer = setTimeout(() => {
            if (inputValue.length > 0) {

                const hasAsset = compareType === 'includes' 
                    ? holdings.find(asset => asset.id.toString().includes(inputValue))
                    : holdings.find(asset => asset.id.toString() === inputValue)

                if (hasAsset) {
                    setData(hasAsset)
                    setStatus(HTTP_STATUS.FULFILLED)
                } else {
                    setStatus(HTTP_STATUS.PENDING)
                    dispatch(action(dataToDispatch))
                    .unwrap()
                    .then((res) => {
                        setData(res)
                        setStatus(HTTP_STATUS.FULFILLED)
                    })
                    .catch((err) => {
                        setError(err)
                        setStatus(HTTP_STATUS.REJECTED)
                    })
                }                
            }
        }, 1000)

        return(() => {
            clearTimeout(inputRateTimer)
        })
    }, [inputValue])

    return { status, data, error }
}
