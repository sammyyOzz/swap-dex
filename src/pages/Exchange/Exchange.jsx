import React, { useEffect, useState } from 'react'
import * as Styles from './exchange'
import { Grid } from '@mui/material'
import exchangeLogo from '../../assets/icons/exchange.png'
import { Button } from '../../components/UI/Button/button'
import useFormValidity from '../../Hooks/FormValidity'
import { useDispatch, useSelector } from 'react-redux'
import { checkAlgorandAssetIsValid, getAlgorandSwapValue, resetSwapValueData, swapAlgorand, algorandLiquidity, getActiveAlgorandWallet } from '../../app/algorand/algorandSlice'
import { HTTP_STATUS } from '../../constants/httpStatus'
import Modal from '../../components/UI/Modal/Modal'
import ModalResponse from '../../components/ModalResponse/ModalResponse'
import useModal from '../../Hooks/Modal'
import useSubmit from '../../Hooks/Submit'
import { ThreeDots } from 'react-loader-spinner'
import { CustomDropdownContainer, CustomSelectBox, CustomSelectInput } from '../../components/CustomSelect/CustomSelect'
import useCustomSelect from '../../Hooks/CustomSelect'
import useFormControl from '../../Hooks/FormControl'
import { useSearchAssetByIdCompare } from '../../Hooks/SearchAssetById'
import useTabs from '../../Hooks/Tabs'
import MyTabs from '../../components/MyTabs/MyTabs'
import tinymanLogo from '../../assets/icons/tinyman.svg'
import { hbarToToken, tokenToHbar } from '../../app/swift/swiftSlice'

const SWAP = "Swap"
const LIQUIDITY = "Liquidity"

//subtabs
const ADD_LIQUIDITY = "Add liquidity"
const CREATE_PAIR = "Create Pair"
const REMOVE_LIQUIDITY = "Remove liquidity"

const tabs = [SWAP, LIQUIDITY]

const liquiditySubtabs = [ADD_LIQUIDITY, CREATE_PAIR, REMOVE_LIQUIDITY]


function ExchangeAlgo() {
    const { tabValue, handleTabChange } = useTabs(tabs[0])
    const { 
        tabValue: liquiditySubtabValue, 
        handleTabChange: handleLiquiditySubTabChange 
    } = useTabs(liquiditySubtabs[0])

    const dispatch = useDispatch()
    // const network = useSelector(state => state.network.network)
    // const { data: activeWalletData } = useSelector(state => state.algorand.activeWallet);
    const passphrase = useSelector(state => state.algorand.passphrase)

    const {
        selectedItem: fromSelectedItem,
        setSelectedItem: setFromSelectedItem,
        dropdownIsOpen: fromDropdownIsOpen,
        setDropdownIsOpen: setFromDropdownIsOpen,
        toggleDropdownIsOpen: toggleFromDropdownIsOpen,
    } = useCustomSelect('initializeAsFilled')

    // console.log(fromSelectedItem)
    
    const {
        selectedItem: toSelectedItem,
        setSelectedItem: setToSelectedItem,
        dropdownIsOpen: toDropdownIsOpen,
        setDropdownIsOpen: setToDropdownIsOpen,
        toggleDropdownIsOpen: toggleToDropdownIsOpen,
    } = useCustomSelect('initializeAsFilled')

    const { value: fromInputValue, handleChange: handleFromInputChange, handleSetValue: handleSetFromInputValue } = useFormControl()
    const { value: toInputValue, handleChange: handleToInputChange, handleSetValue: handleSetToInputValue } = useFormControl()

    const [swapIds, setSwapIds] = useState({ from: fromSelectedItem.TokenId, to: toSelectedItem.TokenId })

    const { formIsValid } = useFormValidity(fromInputValue, toInputValue)
    const { handleSubmit } = useSubmit()
    const { status: getSwapValueStatus, error: errorMessage } = useSelector(state => state.algorand.swapValue)
    const swapValueError = errorMessage?.error
    const { data: holdingsData } = useSelector(state => state.swift.holdings)
    const { modalState, handleModalOpen, handleModalClose } = useModal()

    const swiftAccount = useSelector(state => state.swift.swiftAccount)

    const resetValues = () => {
        setFromSelectedItem({ TokenId: 0, Pair: 'Hbar', amount: 0, unit: 'Algo' })
        setToSelectedItem("")
        handleSetFromInputValue("")
        handleSetToInputValue("")
    }

    const swapResponseCallback = () => {
        resetValues()
        handleModalOpen()
        dispatch(getActiveAlgorandWallet())
    }

    const handleSwap = () => {
        const data = {
            from_asset: fromSelectedItem.TokenId, 
            to_asset: toSelectedItem.TokenId,
            asset_amount: parseFloat(fromInputValue),
            phrase: passphrase
        }

        const dispatchAlgoAction = tabValue === SWAP ? swapAlgorand : algorandLiquidity
                
        handleSubmit(dispatchAlgoAction(data), swapResponseCallback, swapResponseCallback)
    }
    const selectSwap = state => state.algorand.swap
    const selectLiquidity = state => state.algorand.liquidity

    const selectStatusOption = tabValue === SWAP ? selectSwap : selectLiquidity

    const { status, error: errorData } = useSelector(selectStatusOption)
    const error = errorData?.error
    const success = status === HTTP_STATUS.FULFILLED


    useEffect(() => {
        return () => dispatch(resetSwapValueData())
    }, [])


    /**
     * send check request on to asset ID input change
     */
    // const { status: toAssetIsValidStatus, data: toAssetIsValidData } = useSearchAssetByIdCompare(toInputValue, { asset_id: toInputValue }, checkAlgorandAssetIsValid, 'includes')
    
    // const [searchedAssets, setSearchedAssets] = useState([])


    // useEffect(() => {
    //     if (toAssetIsValidData) {
    //         if (!holdingsData.includes(toAssetIsValidData) && !searchedAssets.includes(toAssetIsValidData)) {
    //             setSearchedAssets(prevState => [...prevState, toAssetIsValidData])
    //         }
    //     }
    // }, [toAssetIsValidData])

    const swapData = {
        from_asset: fromSelectedItem.TokenId === swapIds.from ? fromSelectedItem.TokenId : toSelectedItem.TokenId, 
        to_asset: fromSelectedItem.TokenId !== swapIds.from ? fromSelectedItem.TokenId : toSelectedItem.TokenId,
        asset_amount: fromSelectedItem.TokenId === swapIds.from ? parseFloat(fromInputValue) : parseFloat(toInputValue),
        phrase: passphrase
    }
    console.log(swapData)

    /**
     * get equivelent value of other asset to swap to/from and set the value 
     */
     useEffect(() => {
        const inputRateTimer = setTimeout(() => {

            if ((swapData.asset_amount > 0) && (fromSelectedItem.TokenId !== toSelectedItem.TokenId)) {
                if (
                    ((tabValue === LIQUIDITY) && (liquiditySubtabValue === CREATE_PAIR)) ||
                    ((tabValue === LIQUIDITY) && (liquiditySubtabValue === REMOVE_LIQUIDITY))
                ) {
                    return
                }


                if (swapData.from_asset == 0) {
                    dispatch(hbarToToken({
                        tid: swapData.to_asset,
                        hamount: swapData.asset_amount,
                        acctid: swiftAccount?.account_ID,
                        acctkey: swiftAccount?.privateKey
                    }))
                    .unwrap()
                    .then(data => {
                        console.log(data)
                    })
                } else if (swapData.to_asset == 0) {
                    dispatch(tokenToHbar({
                        tid: swapData.from_asset,
                        tamount: swapData.asset_amount,
                        acctid: swiftAccount?.account_ID,
                        acctkey: swiftAccount?.privateKey
                    }))
                    .unwrap()
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => {
                        console.log(err)
                    })

                } else if ((swapData.from_asset != 0) && (swapData.to_asset != 0)) {
                    dispatch(tokenToHbar({
                        tid: swapData.from_asset,
                        tamount: swapData.asset_amount,
                        acctid: '',
                        acctkey: ''
                    }))
                    .unwrap()
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => {
                        console.log(err)
                    })

                    //then result to token
                }

                // dispatch(getAlgorandSwapValue(swapData))
                // .unwrap()
                // .then(swapAmount => {
                //     if (fromSelectedItem.TokenId === swapIds.from) {
                //         handleSetToInputValue(swapAmount)
                //     } else {
                //         handleSetFromInputValue(swapAmount)
                //     }
                // })
                // .catch(err => console.log(err))
            }
        }, 1000)

        return () => clearTimeout(inputRateTimer)
    }, [swapData.asset_amount, fromSelectedItem.TokenId, toSelectedItem.TokenId])

    useEffect(() => {
        if (tabValue === SWAP) handleSetToInputValue("")
    }, [fromSelectedItem.Id])

    useEffect(() => {
        if (tabValue === SWAP) handleSetFromInputValue("")
    }, [toSelectedItem.TokenId])

    const resetToSelectedValues = () => {
        setToSelectedItem("")
        handleSetToInputValue("")
    }

    const handleFromInputFocus = () => {
        setSwapIds({ from: fromSelectedItem.TokenId, to: toSelectedItem.TokenId })
        handleSetToInputValue("")
    }

    const handleToInputFocus = () => {
        setSwapIds({ from: toSelectedItem.TokenId, to: fromSelectedItem.TokenId })
        if (tabValue === SWAP) handleSetFromInputValue("")
    }


    return (
        <>
            <Grid container columns={18}>
                <Grid item xs={2} md={5} />
                <Grid item xs={14} md={8}>
                    <Styles.Root>
                        {/* <Styles.Title>Swap</Styles.Title> */}
                        <div style={{ margin: '0 0 30px 20px'  }}>
                            <MyTabs
                                tabs={tabs}
                                tabValue={tabValue}
                                handleTabChange={handleTabChange}
                                center
                            />
                        </div>
                        <Styles.Text>
                            { tabValue === SWAP 
                                ? "Token should be added to your wallet before swapping." 
                                : (
                                    <MyTabs
                                        tabs={liquiditySubtabs}
                                        tabValue={liquiditySubtabValue}
                                        handleTabChange={handleLiquiditySubTabChange}
                                        center
                                    />
                                )
                            }
                        </Styles.Text>
                        <Styles.Line />
                        <Styles.Container>
                            <div className="innerContainer">

                                {/* <label className="asset-amount">From</label> */}

                                <CustomSelectBox { ...fromSelectedItem } handleClick={toggleFromDropdownIsOpen} />

                                <CustomDropdownContainer 
                                    dropdownItems={holdingsData} 
                                    dropdownIsOpen={fromDropdownIsOpen}
                                    setDropdownIsOpen={setFromDropdownIsOpen}
                                    handleDropdownItemClick={setFromSelectedItem}
                                    handleSetInputValue={handleSetFromInputValue}
                                />

                                <CustomSelectInput 
                                    placeholder="0.00" 
                                    value={fromInputValue}
                                    onChange={handleFromInputChange}
                                    onFocus={handleFromInputFocus}
                                />

                                <Styles.Info>
                                    {/* Balance:&nbsp; 
                                    { fromSelectedItem.id === 0 ? 
                                        <strong>{activeWalletData?.balance}</strong> : 
                                        <strong>{holdingsData?.filter(asset => asset.id === fromSelectedItem.id)[0]?.amount}</strong> 
                                    } */}
                                </Styles.Info>
                            </div>
                            <img src={exchangeLogo} alt="" />
                        </Styles.Container>
                        <Styles.Container>
                            <div className="innerContainer" style={{ padding: '20px 0' }}>

                            
                                <CustomSelectBox { ...toSelectedItem } handleClick={toggleToDropdownIsOpen} /> 

                                <CustomDropdownContainer 
                                    dropdownItems={holdingsData} 
                                    dropdownIsOpen={toDropdownIsOpen}
                                    setDropdownIsOpen={setToDropdownIsOpen}
                                    handleDropdownItemClick={setToSelectedItem}
                                    handleSetInputValue={handleSetToInputValue}
                                />

                                <CustomSelectInput 
                                    placeholder="0.00" 
                                    value={toInputValue}
                                    onChange={handleToInputChange}
                                    onFocus={handleToInputFocus}
                                />

                                {/* { toSelectedItem && <Styles.PasteID onClick={resetToSelectedValues}>Paste Asset ID</Styles.PasteID> } */}

                                { toSelectedItem && <p>{getSwapValueStatus === HTTP_STATUS.REJECTED ? (swapValueError || 'Could not get equivelent value') : ''}</p> }

                                { getSwapValueStatus === HTTP_STATUS.PENDING && (
                                    <Styles.LoaderContainer2><ThreeDots height="80" width="80" color='gray' /></Styles.LoaderContainer2>
                                )}
                                
                                <Styles.Tinyman>
                                    <span>POWERED BY TINYMAN</span>
                                    <img src={tinymanLogo} alt="" />
                                </Styles.Tinyman>
                            </div>
                            
                        </Styles.Container>
                        <Styles.ButtonContainer>
                            <Button 
                                fullWidth 
                                disabled={ !formIsValid || (getSwapValueStatus === HTTP_STATUS.PENDING) || (getSwapValueStatus === HTTP_STATUS.REJECTED) } 
                                onClick={handleSwap}>
                                    { tabValue === SWAP ? "swap" : "Add Liquidity" }
                            </Button>
                        </Styles.ButtonContainer>
                    </Styles.Root>
                </Grid>
                <Grid item xs={2} md={5} />
            </Grid>

            {/* response modal */}
            <Modal open={modalState} handleClose={handleModalClose}>
                <ModalResponse
                    success={success}
                    title={success ? 'success' : 'error'}
                    description={
                        success 
                        ? (tabValue === SWAP ? 'successfully swapped asset' : 'successfully added liquidity') 
                        : (error || 'something went wrong!')
                    }
                />
            </Modal>
        </>
    )
}

export default ExchangeAlgo
