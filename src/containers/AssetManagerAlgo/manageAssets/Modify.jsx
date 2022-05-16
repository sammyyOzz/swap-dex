import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { modifyAlgorand } from '../../../app/algorand/algorandSlice'
import { useSelector } from 'react-redux'
import useSearchAssetWithDropdown from '../../../Hooks/SearchAssetWithDropdown'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import { LoaderContainer } from '../assetManagerAlgo'
import { ThreeDots } from 'react-loader-spinner'
import { Grid } from '@mui/material'
import { CustomDropdownContainer, SelectBox } from '../../../components/CustomSelect/CustomSelect'
import useCustomSelect from '../../../Hooks/CustomSelect'
import { Label, TransactionFee } from '../../../components/UI/DashboardShared/dashboardShared'
import algorandLogo from '../../../assets/icons/algorandLogo.png'


function Modify({ handleModalClose, handleResponse }) {

    const { selectedItem, setSelectedItem, dropdownIsOpen, setDropdownIsOpen, toggleDropdownIsOpen } = useCustomSelect('initializeAsFilled')
    const { value: assetIDValue, handleChange: handleAssetIDChange, handleSetValue: handleSetAssetIDValue } = useFormControl()
    const { value: managerAddressValue, handleChange: handleManagerAddressChange } = useFormControl()
    const { value: reserveAddressValue, handleChange: handleReserveAddressChange } = useFormControl()
    const { value: freezeAddressValue, handleChange: handleFreezeAddressChange } = useFormControl()
    const { value: clawbackAddressValue, handleChange: handleClawbackAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()

    const { checkValidAssetStatus, checkValidAssetError } = useSearchAssetWithDropdown(assetIDValue, setSelectedItem)
    const { data: holdingsData } = useSelector(state => state.algorand.holdings)
    const { formIsValid } = useFormValidity(
        assetIDValue, managerAddressValue, reserveAddressValue, freezeAddressValue, clawbackAddressValue
    )
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleModify = () => {
        handleModalClose()

        const modifyData = { 
            asset_id: assetIDValue, 
            manager_addr: managerAddressValue, 
            reserve_addr: reserveAddressValue,
            freeze_addr: freezeAddressValue,
            clawback_addr: clawbackAddressValue,
            note: noteValue, 
            phrase: passphrase
        }
        handleSubmit(modifyAlgorand(modifyData), handleResponse, handleResponse)
    }


    return (
        <Fragment>
            <ModalTitle>MODIFY</ModalTitle>
            <p>Modify the principal addresses of the specified asset. Only the manager address of this asset can carryout this action.</p>
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
                label="Manager's Address"
                value={managerAddressValue}
                handleChange={handleManagerAddressChange}
            />
            <FormControl 
                type="text"
                label="Reserve Address"
                value={reserveAddressValue}
                handleChange={handleReserveAddressChange}
            />
            <FormControl 
                type="text"
                label="Freeze Address"
                value={freezeAddressValue}
                handleChange={handleFreezeAddressChange}
            />
            <FormControl 
                type="text"
                label="Clawback Address"
                value={clawbackAddressValue}
                handleChange={handleClawbackAddressChange}
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
                    onClick={handleModify}
                >
                    modify
                </Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Modify
