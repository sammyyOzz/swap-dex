import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { destroyAlgorand } from '../../../app/algorand/algorandSlice'
import { useSelector } from 'react-redux'
import useSearchAssetWithDropdown from '../../../Hooks/SearchAssetWithDropdown'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import { LoaderContainer } from '../assetManagerAlgo'
import { ThreeDots } from 'react-loader-spinner'
import useCustomSelect from '../../../Hooks/CustomSelect'
import { CustomDropdownContainer, SelectBox } from '../../../components/CustomSelect/CustomSelect'
import { Grid } from '@mui/material'
import { Label, TransactionFee } from '../../../components/UI/DashboardShared/dashboardShared'
import algorandLogo from '../../../assets/icons/algorandLogo.png'


function Destroy({ handleModalClose, handleResponse }) {
    
    const { selectedItem, setSelectedItem, dropdownIsOpen, setDropdownIsOpen, toggleDropdownIsOpen } = useCustomSelect('initializeAsFilled')
    const { value: assetIDValue, handleChange: handleAssetIDChange, handleSetValue: handleSetAssetIDValue } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()

    const { checkValidAssetStatus, checkValidAssetError } = useSearchAssetWithDropdown(assetIDValue, setSelectedItem)

    const { data: holdingsData } = useSelector(state => state.algorand.holdings)
    const { formIsValid } = useFormValidity(assetIDValue)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleDestroy = () => {
        handleModalClose()

        const destroyData = { 
            asset_id: assetIDValue, 
            note: noteValue, 
            phrase: passphrase
        }
        handleSubmit(destroyAlgorand(destroyData), handleResponse, handleResponse)
    }


    return (
        <Fragment>
            <ModalTitle>DELETE TOKEN</ModalTitle>
            <p>Completely delete an asset from the network. All assets must be held by the creator address before the manager address can execute this action.</p>
            <Grid item container xs={12} style={{ position: 'relative' }}>
                <SelectBox 
                    { ...selectedItem } 
                    label="Asset"
                    handleClick={(e) => toggleDropdownIsOpen(e)} 
                    value={assetIDValue}
                    onChange={handleAssetIDChange}
                    placeholder="Asset ID"
                />

                <CustomDropdownContainer 
                    dropdownItems={holdingsData} 
                    dropdownIsOpen={dropdownIsOpen}
                    setDropdownIsOpen={setDropdownIsOpen}
                    handleDropdownItemClick={setSelectedItem}
                    handleSetInputValue={handleSetAssetIDValue}
                    inputValueToSet="id"
                />
            </Grid>
            <p>{checkValidAssetError}</p>
            { checkValidAssetStatus === HTTP_STATUS.PENDING && (
                <LoaderContainer><ThreeDots height="80" width="80" color='gray' /></LoaderContainer>
            )}
            <FormControl 
                label="Note"
                textArea
                value={noteValue}
                handleChange={handleNoteChange}
            />
            <Label>Transaction Fee</Label>
            <TransactionFee>
                <img src={algorandLogo} alt="" />
                <p>1.00</p>
            </TransactionFee>
            <ButtonContainer>
                <Button 
                    fullWidth 
                    disabled={!formIsValid || checkValidAssetError || (checkValidAssetStatus === HTTP_STATUS.PENDING)} 
                    onClick={handleDestroy}
                >
                    delete
                </Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Destroy
