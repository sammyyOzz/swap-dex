import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { freezeAlgorand } from '../../../app/algorand/algorandSlice'
import { useSelector } from 'react-redux'
import useSelectInput from '../../../Hooks/SelectInput'
import SelectInput from '../../../components/SelectInput/SelectInput'
import useSearchAssetWithDropdown from '../../../Hooks/SearchAssetWithDropdown'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import { LoaderContainer } from '../assetManagerAlgo'
import { ThreeDots } from 'react-loader-spinner'
import { Grid } from '@mui/material'
import { CustomDropdownContainer, SelectBox } from '../../../components/CustomSelect/CustomSelect'
import useCustomSelect from '../../../Hooks/CustomSelect'
import { Label, TransactionFee } from '../../../components/UI/DashboardShared/dashboardShared'
import algorandLogo from '../../../assets/icons/algorandLogo.png'


//target address for testing
// WBJY32EU6GP3UKAAM5FLUUPHU7K74CZDDH4ULHOKKUQN3PZLZUHVRXN5IY 


function Freeze({ handleModalClose, handleResponse }) {
    const { selectedItem, setSelectedItem, dropdownIsOpen, setDropdownIsOpen, toggleDropdownIsOpen } = useCustomSelect('initializeAsFilled')
    const { value: assetIDValue, handleChange: handleAssetIDChange, handleSetValue: handleSetAssetIDValue } = useFormControl()
    const { checkValidAssetStatus, checkValidAssetError } = useSearchAssetWithDropdown(assetIDValue, setSelectedItem)
    
    const { value: targetAddressValue, handleChange: handleTargetAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()

    const { formIsValid } = useFormValidity(assetIDValue, targetAddressValue)

    const { data: holdingsData } = useSelector(state => state.algorand.holdings)
    const passphrase = useSelector(state => state.algorand.passphrase)

    const { handleSubmit } = useSubmit()

    const handleFreeze = () => {
        handleModalClose()

        const freezeData = { 
            asset_id: assetIDValue, 
            target_addr: targetAddressValue, 
            note: noteValue, 
            phrase: passphrase
        }
        handleSubmit(freezeAlgorand(freezeData), handleResponse, handleResponse)
    }


    return (
        <Fragment>
            <ModalTitle>FREEZE</ModalTitle>
            <p>Disables the specified target address from transacting with the asset, only the freeze address of this asset can carry out this action.</p>
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
                    onClick={handleFreeze}
                >
                    freeze
                </Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Freeze
