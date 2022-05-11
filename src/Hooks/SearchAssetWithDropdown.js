import { useSelector, useDispatch } from 'react-redux';
import { checkAlgorandAssetIsValid } from '../app/algorand/algorandSlice';
import { HTTP_STATUS } from '../constants/httpStatus';
import { useState, useEffect } from 'react'

function useSearchAssetWithDropdown(assetId, handleSetAssetValue) {
    const dispatch = useDispatch()
    const { data: holdingsData } = useSelector(state => state.algorand.holdings)
    const [checkValidAssetStatus, setCheckValidAssetStatus] = useState(null)
    // const [checkValidAssetData, setCheckValidAssetData] = useState(null)
    const [checkValidAssetError, setCheckValidAssetError] = useState('')

    const [checkValidAssetExchangeStatus, setCheckValidAssetExchangeStatus] = useState(HTTP_STATUS.FULFILLED) //for exchange/swap algo
  
    useEffect(() => {
        const inputRateTimer = setTimeout(() => {
            if (assetId.length > 0) {

                const hasAsset =  holdingsData?.filter(asset => asset.id === assetId)[0]
                
                if (hasAsset) {
                    handleSetAssetValue(hasAsset)
                    setCheckValidAssetStatus(HTTP_STATUS.FULFILLED)
                    setCheckValidAssetError('')

                    setCheckValidAssetExchangeStatus(HTTP_STATUS.FULFILLED)
                } else {
                    setCheckValidAssetStatus(HTTP_STATUS.PENDING)

                    setCheckValidAssetExchangeStatus(HTTP_STATUS.PENDING)

                    dispatch(checkAlgorandAssetIsValid({ asset_id: parseInt(assetId) }))
                    .unwrap()
                    .then(res => {
                        // console.log(res)
                        if (res.id) {
                            handleSetAssetValue(res)
                            setCheckValidAssetStatus(HTTP_STATUS.FULFILLED)
                            // setCheckValidAssetData(res)
                            setCheckValidAssetError('')

                            setCheckValidAssetExchangeStatus(HTTP_STATUS.FULFILLED)
                        } else {
                            setCheckValidAssetError(res.message)
                            setCheckValidAssetStatus(HTTP_STATUS.REJECTED)

                            setCheckValidAssetExchangeStatus(HTTP_STATUS.REJECTED)
                        }
                        
                    })
                    .catch(err => {
                        console.log(err)
                        setCheckValidAssetStatus(HTTP_STATUS.REJECTED)
                        setCheckValidAssetError('Asset not found')
                    })
                }
            }
        }, 1000);

        return () => clearTimeout(inputRateTimer)
    }, [assetId])

    return {
        checkValidAssetStatus,
        // checkValidAssetData,
        checkValidAssetError,

        checkValidAssetExchangeStatus

    }

}

export default useSearchAssetWithDropdown