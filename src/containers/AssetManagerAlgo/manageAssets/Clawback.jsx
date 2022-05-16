import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { createAlgorandClawback } from '../../../app/algorand/algorandSlice'
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

function Unfreeze({ handleModalClose, handleResponse }) {
    
    const { selectedItem, setSelectedItem, dropdownIsOpen, setDropdownIsOpen, toggleDropdownIsOpen } = useCustomSelect('initializeAsFilled')
    const { value: assetIDValue, handleChange: handleAssetIDChange, handleSetValue: handleSetAssetIDValue } = useFormControl()
    const { value: amountValue, handleChange: handleAmountChange } = useFormControl()
    const { value: targetAddressValue, handleChange: handleTargetAddressChange } = useFormControl()
    const { value: receivingAddressValue, handleChange: handleReceivingAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    
    const { checkValidAssetStatus, checkValidAssetError } = useSearchAssetWithDropdown(assetIDValue, setSelectedItem)

    const { data: holdingsData } = useSelector(state => state.algorand.holdings)
    
    const { formIsValid } = useFormValidity(assetIDValue, amountValue, targetAddressValue, receivingAddressValue)
    const passphrase = useSelector(state => state.algorand.passphrase)


    const { handleSubmit } = useSubmit()

    const handleClawback = () => {
        handleModalClose()

        const clawbackData = { 
            asset_id: assetIDValue, 
            amount: amountValue,
            target_addr: targetAddressValue, 
            receiving_address: receivingAddressValue,
            note: noteValue, 
            phrase: passphrase
        }
        handleSubmit(createAlgorandClawback(clawbackData), handleResponse, handleResponse)
    }


    return (
        <Fragment>
            <ModalTitle>CLAWBACK</ModalTitle>
            <p>Retrieve the asset from the target address and send it to the receiving address. Only the clawback address of this asset can carryout this action.</p>
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
                label="Amount"
                value={amountValue}
                handleChange={handleAmountChange}
            />
            <FormControl 
                type="text"
                label="Target Address"
                value={targetAddressValue}
                handleChange={handleTargetAddressChange}
            />
            <FormControl 
                type="text"
                label="Receiving Address"
                value={receivingAddressValue}
                handleChange={handleReceivingAddressChange}
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
                    onClick={handleClawback}
                >
                    clawback
                </Button>            
            </ButtonContainer>
        </Fragment>
    )
}

export default Unfreeze
