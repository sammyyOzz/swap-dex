import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import { algorandOptIn, checkAlgorandAssetIsValid } from '../../../app/algorand/algorandSlice'
import useSubmit from '../../../Hooks/Submit'
import useFormValidity from '../../../Hooks/FormValidity'
import { useSelector } from 'react-redux'
import SelectWithoutDropdown from '../../../components/SelectInput/SelectWithoutDropdown'
import useSearchAssetById from '../../../Hooks/SearchAssetById'
import { ThreeDots } from 'react-loader-spinner'
import { LoaderContainer } from '../assetManagerAlgo'
import { HTTP_STATUS } from '../../../constants/httpStatus'


function OptIn({ handleModalClose, handleResponse }) {
    const { value: assetIdValue, handleChange: handleAssetIdChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(assetIdValue)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleOptIn = () => {
        handleModalClose()
        
        const optInData = { asset_id: assetIdValue, note: noteValue, phrase: passphrase }
        handleSubmit(algorandOptIn(optInData), handleResponse, handleResponse)
    }

    //send check request on input change
    const { status: assetIsValidStatus, data: assetIsValidData } = useSearchAssetById(assetIdValue, { asset_id: assetIdValue }, checkAlgorandAssetIsValid)

    return (
        <Fragment>
            <ModalTitle>ADD-ASSET</ModalTitle>
            <p>Enable asset access to account.</p>

            <SelectWithoutDropdown
                label="Asset ID"
                value={assetIdValue}
                handleChange={handleAssetIdChange}
                asset={assetIsValidData}
                placeholder="Asset ID"
            />
            <p>{assetIsValidData?.message}</p>

            { assetIsValidStatus === HTTP_STATUS.PENDING && (
                <LoaderContainer><ThreeDots height="80" width="80" color='gray' /></LoaderContainer>
            )}
            
            <FormControl 
                label="Note"
                textArea
                value={noteValue}
                handleChange={handleNoteChange}
            />
            <ButtonContainer>
                <Button fullWidth onClick={handleOptIn} disabled={!formIsValid || !assetIsValidData?.unit}>add</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default OptIn
