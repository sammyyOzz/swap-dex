import React, { Fragment } from 'react'
import { Button } from '../UI/Button/button'
import successImg from '../../assets/icons/success.png'
import { useSelector } from 'react-redux'


export function DisclaimerDefault({ checkbox, toggleCheckbox, handleContinue, handleCloseModal }) {

    return (
        <Fragment>
            <h2 className="disclaimerTitle">DISCLAIMER</h2>
            <p>Due to security concerns, Mint Engine does not keep any record of our users' passphrase/seed. Thus, we will not be able to recover your passphrase/seed for you. </p>
            <p>So, if you did not back up the seed properly or if you lost the seed, we will not be able to recover wallet data for you.</p>
            <div className="disclaimer">
                <input type="checkbox" value={checkbox} onChange={toggleCheckbox} checked={checkbox} />
                <p>I understand that Mint Engine is not responsible for the wallet backup process.</p>
            </div>
            <Button fullWidth disabled={!checkbox} onClick={handleContinue}>continue</Button>
            <h3 onClick={handleCloseModal}>CANCEL</h3>
        </Fragment>
    )
}

export function DisclaimerSuccess({ create, handleClick }) {
    
    return (
        <Fragment>
            <div className="success">
                <img src={successImg} alt="" />
            </div>
            <h2 className="success">SUCCESS!</h2>
            <p className="success">{`You have successfully ${create ? 'created' : 'restored'} your wallet.`}</p>
            <Button
                fullWidth
                style={{ marginBottom: '30px' }}
                onClick={handleClick}
            >
                access my wallet
            </Button>
        </Fragment>
    )
}

export function DisclaimerError() {
    const confirmWalletError = useSelector(state => state.algorand.confirmWallet.error)

    return (
        <Fragment>
            <h2 className="error">ERROR!</h2>
            <p className="error">{confirmWalletError}</p>
        </Fragment>
    )
}