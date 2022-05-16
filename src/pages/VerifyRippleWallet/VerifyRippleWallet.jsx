import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
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

    const { value: radioValue, handleClick: handleClickRadio } = useFormControlRadio('Mnemonic')

    const account_ID = useSelector(state => state.swift.swiftAccount?.account_ID)
    const mnemonic = useSelector(state => state.swift.swiftAccount?.mnemonic)
    const privateKey = useSelector(state => state.swift.swiftAccount?.privateKey)


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


    const swiftAccount = useSelector(state => state.swift.swiftAccount)
    

    const { handleSubmit } = useSubmit()

    const handleSubmitForm = () => {
        if (option === 'create') {
            localStorage.setItem('swift_dex', JSON.stringify(swiftAccount))
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
                    localStorage.setItem('swift_dex', JSON.stringify(data));
                    saveAccountDetails(data)
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
        // <AuthWrapper>
            <WalletWrapper
                title={option === 'create' ? 'CREATE NEW WALLET' : 'IMPORT WALLET'}
                description="Ensure you copy and backup the private key shown below."
                link={`/create-wallet/${XRP}`}
            >
                <Styles.Container>
                    {
                        option === 'import' && (
                            <>
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
                        { option === 'create' 
                            ? <>
                                <p><b>Account ID:</b></p>
                                <p>{account_ID}</p>

                                <p><b>Private key:</b></p>
                                <p>{privateKey}</p>

                                <p><b>Mnemonic:</b></p>
                                <p>{mnemonic}</p>
                            </>
                            : <>
                                <textarea value={acctID} onChange={e => setAcctID(e.target.value)} placeholder="Account id" />
                                <textarea value={xrpSeed} onChange={e => setXrpSeed(e.target.value)} placeholder="Mnemonic or private key" />
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
                            { option === 'create' ? 'proceed' : 'import' }
                        </Button>
                    </Styles.ButtonsContainer>

                </Styles.Container>

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
            </WalletWrapper>
        // </AuthWrapper>
    )
}

export default VerifyRippleWallet
