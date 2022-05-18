import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import { Button, CopyButton } from '../../components/UI/Button/button'
// import AuthWrapper from '../../containers/AuthWrapper/AuthWrapper'
import WalletWrapper from '../../containers/WalletWrapper/WalletWrapper'
import * as Styles from '../../components/UI/WalletShared/walletShared'
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { confirmAlgorandPassphrase, incorrectPassphraseError } from '../../app/algorand/algorandSlice'
import { hideBackdrop, showBackdrop } from '../../app/backdrop/backdropSlice'
import Modal from '../../components/UI/Modal/Modal'
import { DisclaimerDefault, DisclaimerError, DisclaimerSuccess } from '../../components/Disclaimer/Disclaimer'
import useDisclaimer from '../../Hooks/Disclaimer'
import { CONFIRMED, CREATE } from '../../constants/walletStatus'
import { DEFAULT, ERROR, SUCCESS } from '../../constants/modalStatus'
import { XRP } from '../../constants/network'
import useFormControlRadio from '../../Hooks/FormControlRadio'
import FormControlRadio from '../../components/FormControl/FormControlRadio'
import useSubmit from '../../Hooks/Submit'
import { importWithMnemonic, importWithPrivateKey, saveAccountDetails, setAccountDatails } from '../../app/swift/swiftSlice'
import Layout from '../../components/Layout/Layout'
import FormControl from '../../components/FormControl/FormControl'
import useFormControl from '../../Hooks/FormControl'
import CopyButtonWithTooltip from '../../components/UI/MyTooltip/MyTooltip'


function VerifyRippleWallet() {
    const { option } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [xrpSeed, setXrpSeed] = useState("")
    const walletId = useSelector(state => state.algorand.id)
    const passphrase = useSelector(state => state.algorand.passphrase).split(" ")
    const [buttonIsEnabled, setButtonIsEnabled] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { checkbox, modalContentStatus, toggleCheckbox, handleModalStatus } = useDisclaimer()
    const [acctID, setAcctID] = useState('')
    const [error, setError] = useState('')

    const { value: accountIDValue, handleChange: handleAccountIDChange } = useFormControl()
    const { value: keyValue, handleChange: handleKeyChange } = useFormControl()

    const { value: radioValue, handleClick: handleClickRadio } = useFormControlRadio('Mnemonic')

    // const account_ID = useSelector(state => state.swift.swiftAccount?.account_ID)
    // const mnemonic = useSelector(state => state.swift.swiftAccount?.mnemonic)
    // const privateKey = useSelector(state => state.swift.swiftAccount?.privateKey)

    const location = useLocation()

    const urlQueryParams = new URLSearchParams(location.search)
    const privateKey = urlQueryParams?.get('privateKey')
    const account_ID = urlQueryParams?.get('account_ID')
    const mnemonic = urlQueryParams?.get('mnemonic')


    const handlePasteSeed = () => {
        navigator.clipboard.readText().then(text => setXrpSeed(text))
    }

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        handleModalStatus(DEFAULT)
    }

    const showDisclaimerModal = () => {
        handleOpenModal()
    }

    const handleVerifyPassphrase = () => {
        handleCloseModal()

        const completedPassphrase = passphrase

        /**
         * !ripplephrase does not exist yet, rewrite handleVerifyPassphrase function for ripple wallet
         */
        if (completedPassphrase !== JSON.parse(localStorage.getItem('ripplephrase'))) {
            dispatch(incorrectPassphraseError({
                status: CREATE,
                error: 'The entered passphrase does not match'
            }))
            handleModalStatus(ERROR)
            handleOpenModal()
            return
        }

        dispatch(showBackdrop())
        dispatch(confirmAlgorandPassphrase({ id: walletId, status: CONFIRMED }))
            .unwrap()
            .then(res => {
                dispatch(hideBackdrop())
                //open modal with success message
                handleModalStatus(SUCCESS)
                handleOpenModal()
                console.log(res)
            })
            .catch(err => {
                dispatch(hideBackdrop())
                //open modal with error message
                handleModalStatus(ERROR)
                handleOpenModal()
                console.log(err)
            })

    }

    useEffect(() => {
        if (xrpSeed.trim().length > 10) {
            setButtonIsEnabled(true)
        } else {
            setButtonIsEnabled(false)
        }
    }, [xrpSeed])

    const navigateToDashboard = () => {
        handleCloseModal()
        navigate('/dashboard')
    }


    const { data: swiftAccount } = useSelector(state => state.swift.swiftAccount)
    console.log(swiftAccount?.account_ID)

    useEffect(() => {
        if (option === 'import' && swiftAccount?.account_ID) {
            setError('A wallet already exists on this device, proceeding will override the existing wallet')
        }
    }, [swiftAccount?.account_ID])


    const { handleSubmit } = useSubmit()

    const handleSubmitForm = () => {
        if (option === 'create') {
            dispatch(saveAccountDetails({ account_ID, privateKey, mnemonic }))
            localStorage.setItem('swift_dex', JSON.stringify({ account_ID, privateKey, mnemonic }))
            navigate('/exchange')

        } else {
            const data = radioValue === 'Mnemonic'
                ? { id: acctID, mnemonic: xrpSeed }
                : { id: acctID, key: xrpSeed }

            const importType = radioValue === 'Mnemonic' ? importWithMnemonic : importWithPrivateKey

            handleSubmit(
                importType(data),
                (res) => {
                    console.log(res)
                    localStorage.setItem('swift_dex', JSON.stringify({ account_ID: data.id, privateKey: data.key }));
                    dispatch(saveAccountDetails({ account_ID: data.id, privateKey: data.key }))
                    navigate('/exchange')
                },
                (err) => {
                    console.log(err)
                    setError('something went wrong')
                }
            )
        }
    }


    return (
        <>
            <Layout
                leftText="IMPORT OR CREATE YOUR WALLET"
                rightText="IMPORT OR CREATE YOUR WALLET"
            >
                {
                    option === 'import' && (
                        <>
                            
                            <Styles.Title>Import your wallet</Styles.Title>

                            <p style={{ color: 'red' }}>{error}</p>
                            
                            <FormControlRadio
                                label="Import with"
                                options={['Mnemonic', 'Private key']}
                                value={radioValue}
                                handleClick={handleClickRadio}
                            />
                        </>
                    )
                }
                <Styles.XrpWordsBox>
                    {option === 'create'
                        ? <>
                            <Styles.Title>Create your wallet</Styles.Title>
                            <p><b>Account ID:</b></p>
                            <p>{account_ID}</p>

                            <p><b>Private key:</b></p>
                            <p>{privateKey}</p>

                            <p><b>Mnemonic:</b></p>
                            <p>{mnemonic}</p>

                            <CopyButtonWithTooltip 
                                textToCopy={`Account ID: ${account_ID} \n Private Key: ${privateKey} \n Mnemonic: ${mnemonic}`} 
                                onlyIcon
                            />
                        </>
                        : <>
                            <FormControl 
                                placeholder="Account ID"
                                value={acctID}
                                handleChange={e => setAcctID(e.target.value)}
                            />

                            <FormControl
                                textArea
                                placeholder="Mnemonic or Private Key"
                                value={xrpSeed}
                                handleChange={e => setXrpSeed(e.target.value)}
                            />
                            {/* <textarea value={acctID} onChange={e => setAcctID(e.target.value)} placeholder="Account id" />
                            <textarea value={xrpSeed} onChange={e => setXrpSeed(e.target.value)} placeholder="Mnemonic or private key" /> */}
                        </>
                    }
                </Styles.XrpWordsBox>

                <Styles.ButtonsContainer>
                    {/* <CopyButton outlined onClick={handlePasteSeed}>
                            paste <NoteOutlinedIcon fontSize="small" sx={{ ml: '7px', transform: 'rotate(90deg)' }} />
                        </CopyButton>  */}

                    <Button
                        fullWidth
                        // disabled={!buttonIsEnabled} 
                        // onClick={showDisclaimerModal}
                        onClick={handleSubmitForm}
                    >
                        {option === 'create' ? 'proceed' : 'import'}
                    </Button>
                </Styles.ButtonsContainer>

                <Modal open={openModal} handleClose={handleCloseModal}>
                    <Styles.ModalContent>
                        {
                            modalContentStatus === DEFAULT &&
                            <DisclaimerDefault
                                checkbox={checkbox}
                                toggleCheckbox={toggleCheckbox}
                                handleContinue={handleVerifyPassphrase}
                                handleCloseModal={handleCloseModal}
                            />
                        }
                        {
                            modalContentStatus === SUCCESS &&
                            <DisclaimerSuccess
                                create
                                handleClick={navigateToDashboard}
                            />
                        }
                        {
                            modalContentStatus === ERROR &&
                            <DisclaimerError />
                        }
                    </Styles.ModalContent>
                </Modal>
            </Layout>
        </>
    )
}

export default VerifyRippleWallet
