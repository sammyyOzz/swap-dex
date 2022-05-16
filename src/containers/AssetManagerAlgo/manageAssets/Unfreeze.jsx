import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { unfreezeAlgorand } from '../../../app/algorand/algorandSlice'
import { useSelector } from 'react-redux'
import useSearchAssetWithDropdown from '../../../Hooks/SearchAssetWithDropdown'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import { LoaderContainer } from '../assetManagerAlgo'
import { ThreeDots } from 'react-loader-spinner'
import { CustomDropdownContainer, SelectBox } from '../../../components/CustomSelect/CustomSelect'
import { Grid } from '@mui/material'
import useCustomSelect from '../../../Hooks/CustomSelect'
import { Label, TransactionFee } from '../../../components/UI/DashboardShared/dashboardShared'
import algorandLogo from '../../../assets/icons/algorandLogo.png'


function Unfreeze({ handleModalClose, handleResponse }) {
    
    const { selectedItem, setSelectedItem, dropdownIsOpen, setDropdownIsOpen, toggleDropdownIsOpen } = useCustomSelect('initializeAsFilled')
    const { value: assetIDValue, handleChange: handleAssetIDChange, handleSetValue: handleSetAssetIDValue } = useFormControl()
    const { value: targetAddressValue, handleChange: handleTargetAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()

    const { checkValidAssetStatus, checkValidAssetError } = useSearchAssetWithDropdown(assetIDValue, setSelectedItem)
    const { data: holdingsData } = useSelector(state => state.algorand.holdings)
    const { formIsValid } = useFormValidity(assetIDValue, targetAddressValue)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleUnfreeze = () => {
        handleModalClose()

        const unfreezeData = { 
            asset_id: assetIDValue, 
            target_addr: targetAddressValue, 
            note: noteValue, 
            phrase: passphrase 
        }
        handleSubmit(unfreezeAlgorand(unfreezeData), handleResponse, handleResponse)
    }


    return (
        <Fragment>
            <ModalTitle>UNFREEZE</ModalTitle>
            <p>Enables the specified target address from transacting with the asset, only the freeze address of this asset can carry out this action. Asset must have been previously frozen for the target address.</p>
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
                type="text"
                label="Target Address"
                value={targetAddressValue}
                handleChange={handleTargetAddressChange}
            />
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
                    onClick={handleUnfreeze}
                >
                    unfreeze
                </Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Unfreeze
