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
import ClickAwayListener from 'react-click-away-listener'
import { addLiquidity, createPair, getHbarAmount, getTokenAmount, hbarToToken, removeLiquidity, tokenToHbar, tokenToToken, getLiquidityPool } from '../../app/swift/swiftSlice'
import Layout from '../../components/Layout/Layout'
import Table from '../../components/Table/Table'
import { ButtonsContainer } from '../../components/UI/WalletShared/walletShared'
import { useNavigate } from 'react-router-dom'

const SWAP = "Swap"
const LIQUIDITY = "Liquidity"

//subtabs
const ADD_LIQUIDITY = "Add liquidity"
const CREATE_PAIR = "Create Pair"
const REMOVE_LIQUIDITY = "Remove liquidity"

const tabs = [SWAP, LIQUIDITY]

const liquiditySubtabs = [ADD_LIQUIDITY, CREATE_PAIR, REMOVE_LIQUIDITY]


function ExchangeAlgo() {
    const navigate = useNavigate()
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
    // const swapValueError = errorMessage?.error
    const { data: holdingsData, status: holdingsStatus } = useSelector(state => state.swift.holdings)

    const [resSuccess, setResSuccess] = useState(false)
    const [resMessage, setResMessage] = useState('')

    const { modalState, handleModalOpen, handleModalClose } = useModal()

    const { data: swiftAccount} = useSelector(state => state.swift.swiftAccount)
    const [swiftdexStatus, setSwiftdexStatus] = useState(null)
    const [swiftdexError, setSwiftdexError] = useState('')

    const accountStatus = useSelector(state => state.swift.accountInfo.status)
    const accountInfo = useSelector(state => state.swift.accountInfo.data)
    const accountTokens = accountInfo?.Tokens


    console.log('swift error', swiftdexError)

    const resetValues = () => {
        setFromSelectedItem({ TokenId: 0, Pair: 'Hbar', amount: 0, unit: 'Algo' })
        setToSelectedItem({ TokenId: 0, Pair: 'Hbar', amount: 0, unit: 'Algo' })
        handleSetFromInputValue("")
        handleSetToInputValue("")
    }

    useEffect(() => {
        resetValues()
    }, [tabValue, liquiditySubtabValue])

    // const swapResponseCallback = () => {
    //     resetValues()
    //     handleModalOpen()
    //     dispatch(getActiveAlgorandWallet())
    // }

    // const [buttonIsEnabled, setButtonIsEnabled] = useState(false)

    // useEffect(() => {
    //     if (tabValue === SWAP && fromInputValue && toInputValue) {
    //         setButtonIsEnabled(true)
    //     } else if (tab)
    // }, [liquiditySubtabValue, tabValue])

    const handleSwap = () => {

        if (tabValue === LIQUIDITY && liquiditySubtabValue === ADD_LIQUIDITY) {
            handleSubmit(addLiquidity({ 
                tid: fromSelectedItem.TokenId || toSelectedItem.TokenId, 
                tamount: fromSelectedItem.TokenId ? fromInputValue : toInputValue,
                hamount: fromSelectedItem.TokenId ? toInputValue : fromInputValue, 
                acctid: swiftAccount?.account_ID,
                acctkey: swiftAccount?.privateKey
            }),
            (res) => {
                handleModalOpen()
                setResMessage(res)
                resetValues()
                console.log(res);
            },
            (err) => {
                handleModalOpen()
                setResMessage(err)
                resetValues()
                console.log(err);
            })
        } else if (tabValue === LIQUIDITY && liquiditySubtabValue === CREATE_PAIR) {
            handleSubmit(createPair({ 
                tid: fromSelectedItem.TokenId || toSelectedItem.TokenId, 
                tamount: fromSelectedItem.TokenId ? fromInputValue : toInputValue,
                hamount: fromSelectedItem.TokenId ? toInputValue : fromInputValue,
                acctid: swiftAccount?.account_ID,
                acctkey: swiftAccount?.privateKey
            }),
            (res) => {
                handleModalOpen()
                setResMessage(res)
                resetValues()
                console.log(res);
            },
            (err) => {
                handleModalOpen()
                setResMessage(err)
                resetValues()
                console.log(err);
            })
        } else if (tabValue === LIQUIDITY && liquiditySubtabValue === REMOVE_LIQUIDITY) {
            handleSubmit(removeLiquidity({
                tid: fromSelectedItem.TokenId, 
                tamount: fromInputValue,
                acctid: swiftAccount?.account_ID,
                acctkey: swiftAccount?.privateKey
            }),
            (res) => {
                handleModalOpen()
                setResMessage(res)
                resetValues()
                console.log(res);
            },
            (err) => {
                handleModalOpen()
                setResMessage(err)
                resetValues()
                console.log(err);
            })
        } else if (tabValue === SWAP && fromSelectedItem.TokenId == 0 && toSelectedItem.TokenId != 0) {
            handleSubmit(hbarToToken({ 
                tid: toSelectedItem.TokenId,
                hamount: fromInputValue,
                acctid: swiftAccount?.account_ID,
                acctkey: swiftAccount?.privateKey
            }),
            (res) => {
                handleModalOpen()
                setResMessage(res)
                resetValues()
                console.log(res);
            },
            (err) => {
                handleModalOpen()
                setResMessage(err)
                resetValues()
                console.log(err);
            })
        } else if (tabValue === SWAP && fromSelectedItem.TokenId != 0 && toSelectedItem.TokenId == 0) {
            handleSubmit(tokenToHbar({
                tid: fromSelectedItem.TokenId,
                tamount: fromInputValue,
                acctid: swiftAccount?.account_ID,
                acctkey: swiftAccount?.privateKey
            }),
            (res) => {
                handleModalOpen()
                setResMessage(res)
                resetValues()
                console.log(res);
            },
            (err) => {
                handleModalOpen()
                setResMessage(err)
                resetValues()
                console.log(err);
            })
        } else if (tabValue === SWAP && fromSelectedItem.TokenId != 0 && toSelectedItem.TokenId != 0) {
            handleSubmit(tokenToToken({
                fromid: fromSelectedItem.TokenId,
                toid: toSelectedItem.TokenId,
                tamount: fromInputValue,
                acctid: swiftAccount?.account_ID,
                acctkey: swiftAccount?.privateKey
            }),
            (res) => {
                handleModalOpen()
                setResMessage(res)
                resetValues()
                console.log(res);
            },
            (err) => {
                handleModalOpen()
                setResMessage(err)
                resetValues()
                console.log(err);
            })
        }
    }
    const selectSwap = state => state.algorand.swap
    const selectLiquidity = state => state.algorand.liquidity

    const selectStatusOption = tabValue === SWAP ? selectSwap : selectLiquidity

    const { status, error: errorData } = useSelector(selectStatusOption)
    const error = errorData?.error
    const success = status === HTTP_STATUS.FULFILLED


    /**
     * get equivelent value of other asset to swap to/from and set the value 
     */
    useEffect(() => {
        const inputRateTimer = setTimeout(() => {

            if (fromInputValue > 0) {
                if (
                    ((tabValue === LIQUIDITY) && (liquiditySubtabValue === CREATE_PAIR)) ||
                    ((tabValue === LIQUIDITY) && (liquiditySubtabValue === REMOVE_LIQUIDITY))
                ) {
                    return
                }

                if (fromSelectedItem.TokenId == 0) {
                    setSwiftdexStatus(HTTP_STATUS.PENDING)
                    dispatch(getTokenAmount({
                        tid: toSelectedItem.TokenId,
                        hamount: fromInputValue,
                        acctid: swiftAccount?.account_ID,
                        acctkey: swiftAccount?.privateKey
                    }))
                    .unwrap()
                    .then(data => {
                        setSwiftdexStatus(HTTP_STATUS.FULFILLED)
                        console.log(data)
                        const amount = ((tabValue === LIQUIDITY) && (liquiditySubtabValue === ADD_LIQUIDITY)) 
                            ? (Number(data["Token Amount"]) * 1.003)
                            : data["Token Amount"]
                        handleSetToInputValue(amount)
                        if (typeof(data) !== 'object') setSwiftdexError(data)
                    })
                    .catch(err => {
                        console.log(err)
                        setSwiftdexError(err)
                        setSwiftdexStatus(HTTP_STATUS.REJECTED)
                    })
                } else if ((fromSelectedItem.TokenId != 0) && (toSelectedItem.TokenId == 0)) {
                    setSwiftdexStatus(HTTP_STATUS.PENDING)
                    dispatch(getHbarAmount({
                        tid: fromSelectedItem.TokenId,
                        tamount: fromInputValue,
                        acctid: swiftAccount?.account_ID,
                        acctkey: swiftAccount?.privateKey
                    }))
                    .unwrap()
                    .then(data => {
                        setSwiftdexStatus(HTTP_STATUS.FULFILLED)
                        console.log(data)
                        handleSetToInputValue(data["Hbar Amount"])
                        if (typeof(data) !== 'object') setSwiftdexError(data)
                    })
                    .catch(err => {
                        setSwiftdexStatus(HTTP_STATUS.REJECTED)
                        console.log(err)
                        setSwiftdexError(err)
                    })

                } else if ((fromSelectedItem.TokenId != 0) && (toSelectedItem.TokenId != 0)) {
                    setSwiftdexStatus(HTTP_STATUS.PENDING)
                    dispatch(getHbarAmount({
                        tid: fromSelectedItem.TokenId,
                        tamount: fromInputValue,
                        acctid: swiftAccount?.account_ID,
                        acctkey: swiftAccount?.privateKey
                    }))
                    .unwrap()
                    .then(data => {
                        console.log(data)
                        dispatch(getTokenAmount({
                            tid: toSelectedItem.TokenId,
                            hamount: data['Hbar Amount'],
                            acctid: swiftAccount?.account_ID,
                            acctkey: swiftAccount?.privateKey
                        }))
                        .unwrap()
                        .then(data => {
                            setSwiftdexStatus(HTTP_STATUS.FULFILLED)
                            console.log('final result', data)
                            handleSetToInputValue(data["Token Amount"])
                            if (typeof(data) !== 'object') setSwiftdexError(data)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        setSwiftdexError(err)
                    })

                    //then result to token
                }

            }
        }, 1000)

        return () => clearTimeout(inputRateTimer)
    }, [fromSelectedItem.TokenId, fromInputValue, toSelectedItem.TokenId])

    useEffect(() => {
        if (tabValue === SWAP) handleSetToInputValue("")
    }, [fromSelectedItem.TokenId])

    useEffect(() => {
        if (tabValue === SWAP) handleSetFromInputValue("")
    }, [toSelectedItem.TokenId])

    useEffect(() => {
        setSwiftdexError(null)
    }, [tabValue, liquiditySubtabValue])

    const resetToSelectedValues = () => {
        setToSelectedItem("")
        handleSetToInputValue("")
    }

    const handleFromInputFocus = () => {
        if ((liquiditySubtabValue === CREATE_PAIR) || (liquiditySubtabValue === REMOVE_LIQUIDITY)) return
        setSwapIds({ from: fromSelectedItem.TokenId, to: toSelectedItem.TokenId })
        handleSetToInputValue("")
    }

    const handleToInputFocus = () => {
        if ((liquiditySubtabValue === CREATE_PAIR) || (liquiditySubtabValue === REMOVE_LIQUIDITY)) return
        setSwapIds({ from: toSelectedItem.TokenId, to: fromSelectedItem.TokenId })
        handleSetFromInputValue("")
    }


    useEffect(() => {
        if (holdingsStatus === null) {
            dispatch(getLiquidityPool())
        }
    }, [])

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }


    const rows = holdingsData?.slice(1, holdingsData.length).map((item, i) => (
        <tr key={item.TokenId}>
            <td>{item.Pair}</td>
            <td>{item["Hbar Reserve"]}</td>
            <td>{item["Token Reserve"]}</td>
        </tr>
    ))

    const tokenRows = accountTokens?.map(item => (
        <tr key={item.TokenId}>
            <td>{item.TokenSymbol}</td>
            <td>{item.TokenBalance}</td>
            <td>{item.TokenName}</td>
        </tr>
    ))


    return (
        <>
            <Layout fullScreen>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleLogout}>Remove my wallet</Button>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                    
                        <Styles.Root>
                            
                            <p style={{ fontSize: "22px" }}>Balance: {accountInfo["Hbar Balance"] ? accountInfo["Hbar Balance"] : '_ __ _'}</p>

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
                                    ? ""
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

                                    <ClickAwayListener onClickAway={() => setFromDropdownIsOpen(false)}>
                                        <div>
                                            <CustomSelectBox 
                                                { ...fromSelectedItem } 
                                                handleClick={!((tabValue === LIQUIDITY) && (liquiditySubtabValue === ADD_LIQUIDITY)) && toggleFromDropdownIsOpen} 
                                            />

                                            <CustomDropdownContainer 
                                                dropdownItems={(tabValue === LIQUIDITY && liquiditySubtabValue === CREATE_PAIR) ? accountTokens : holdingsData} 
                                                createPair={tabValue === LIQUIDITY && liquiditySubtabValue === CREATE_PAIR}
                                                dropdownIsOpen={fromDropdownIsOpen}
                                                setDropdownIsOpen={setFromDropdownIsOpen}
                                                handleDropdownItemClick={setFromSelectedItem}
                                                handleSetInputValue={handleSetFromInputValue}
                                            />
                                        </div>
                                    </ClickAwayListener>    

                                    <CustomSelectInput 
                                        placeholder="0.00" 
                                        value={fromInputValue}
                                        onChange={handleFromInputChange}
                                        // onFocus={handleFromInputFocus}
                                    />

                                    <Styles.Info>
                                        {/* Balance:&nbsp; 
                                        { fromSelectedItem.id === 0 ? 
                                            <strong>{activeWalletData?.balance}</strong> : 
                                            <strong>{holdingsData?.filter(asset => asset.id === fromSelectedItem.id)[0]?.amount}</strong> 
                                        } */}
                                    </Styles.Info>
                                </div>
                                { !(tabValue === LIQUIDITY && liquiditySubtabValue === REMOVE_LIQUIDITY) && <img src={exchangeLogo} alt="" />}
                            </Styles.Container>

                            { !(tabValue === LIQUIDITY && liquiditySubtabValue === REMOVE_LIQUIDITY) && (
                                <Styles.Container>
                                    <div className="innerContainer" style={{ padding: '20px 0' }}>

                                    <ClickAwayListener onClickAway={() => setToDropdownIsOpen(false)}>
                                        <div>
                                            <CustomSelectBox { ...toSelectedItem } handleClick={toggleToDropdownIsOpen} /> 

                                            <CustomDropdownContainer 
                                                dropdownItems={(tabValue === LIQUIDITY && liquiditySubtabValue === CREATE_PAIR) ? accountTokens : holdingsData} 
                                                createPair={tabValue === LIQUIDITY && liquiditySubtabValue === CREATE_PAIR}
                                                dropdownIsOpen={toDropdownIsOpen}
                                                setDropdownIsOpen={setToDropdownIsOpen}
                                                handleDropdownItemClick={setToSelectedItem}
                                                handleSetInputValue={handleSetToInputValue}
                                            />
                                        </div>
                                    </ClickAwayListener>

                                        <CustomSelectInput 
                                            placeholder="0.00" 
                                            value={toInputValue}
                                            onChange={ !((tabValue === LIQUIDITY) && (liquiditySubtabValue === ADD_LIQUIDITY)) && handleToInputChange}
                                            readyOnly={(tabValue === LIQUIDITY) && (liquiditySubtabValue === ADD_LIQUIDITY)}
                                            // onFocus={handleToInputFocus}
                                        />

                                        {/* { toSelectedItem && <Styles.PasteID onClick={resetToSelectedValues}>Paste Asset ID</Styles.PasteID> } */}

                                        <p>{swiftdexError}</p>

                                        { swiftdexStatus === HTTP_STATUS.PENDING && (
                                            <Styles.LoaderContainer2><ThreeDots height="80" width="80" color='gray' /></Styles.LoaderContainer2>
                                        )}
                                        
                                    </div>
                                    
                                </Styles.Container>
                            )}
                            <Styles.ButtonContainer>
                                <Button 
                                    fullWidth 
                                    // disabled={ !formIsValid || (swiftdexStatus === HTTP_STATUS.PENDING) || (swiftdexStatus === HTTP_STATUS.REJECTED) } 
                                    onClick={handleSwap}>
                                        { tabValue === SWAP 
                                            ? "swap" 
                                            : (liquiditySubtabValue === ADD_LIQUIDITY ? 'Add liquidity' : liquiditySubtabValue === CREATE_PAIR ? 'Create Pair' : 'Remove liquidity') 
                                        }
                                </Button>
                            </Styles.ButtonContainer>
                        </Styles.Root>
                    </Grid>

                    <Grid item container xs={12} md={6}>

                    

                        <Grid item xs={12}>
                            
                            { holdingsStatus === HTTP_STATUS.PENDING ? (
                                <Styles.LoaderContainer2><ThreeDots height="100" width="200" color='gray' /></Styles.LoaderContainer2>
                            ) : (
                                <>
                                    <div style={{ margin: '50px auto 20px 10px', fontWeight: 'bold', fontSize: '22px'}}>Token Pairs</div>
                                    <Styles.TableBox>
                                        <Table
                                            columnTitles={['pair', 'hbar reserve', 'token reserve']}
                                            columnsToHideOnMobile={[]}
                                            rows={rows}
                                            noDataTitle="NO DATA TO DISPLAY"
                                            noDataText="There is currntly nothing to be displayed yet."
                                        /> 
                                    </Styles.TableBox>  
                                </>
                            )}
                             
                        </Grid>

                        <Grid item xs={12}>

                            { accountStatus === HTTP_STATUS.PENDING ? (
                                <Styles.LoaderContainer2 style={{ marginTop: '50px' }}><ThreeDots height="100" width="200" color='gray' /></Styles.LoaderContainer2>
                            ) : (
                                <>
                                    <div style={{ margin: '50px auto 20px 10px', fontWeight: 'bold', fontSize: '22px'}}>My Tokens</div>
                                        <Styles.TableBox>
                                            <Table
                                                columnTitles={['symbol', 'balance', 'name']}
                                                columnsToHideOnMobile={[]}
                                                rows={tokenRows}
                                                noDataTitle="NO DATA TO DISPLAY"
                                                noDataText="There is currntly nothing to be displayed yet."
                                            /> 
                                        </Styles.TableBox>
                                </>
                            )}      
                        </Grid>
                    </Grid>
                </Grid>
            </Layout>

            {/* response modal */}
            <Modal open={modalState} handleClose={handleModalClose}>
                <ModalResponse
                    hideImageAndTitle
                    success={resSuccess}
                    title={resSuccess ? 'success' : 'error'}
                    description={resMessage}
                />
            </Modal>
        </>
    )
}

export default ExchangeAlgo
