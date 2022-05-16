import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import WalletCard from '../../components/WalletCard/WalletCard'
import * as Styles from './landing'
import { useDispatch } from 'react-redux'
import { createAccount, saveAccountDetails } from '../../app/swift/swiftSlice'
import useSubmit from '../../Hooks/Submit'

function Landing() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { handleSubmit } = useSubmit()
    const [error, setError] = useState('')
    

    const handleCreateWallet = () => {
        if (localStorage.getItem('swift_dex')) {
            setError('You already have an account')
        } else {
            
            handleSubmit(
                createAccount(),
                (data) => {
                    saveAccountDetails(data)
                    navigate(`/wallet/create?account_ID=${data.account_ID}&privateKey=${data.privateKey}&mnemonic=${data.mnemonic}`)
                },
                err => {
                    setError('Something went wrong')
                    console.log(err)
                }
            )
        }

    }

    // const handleImportWallet = () => {

    // }

    return (
        <Grid container>
            <Grid item xs={1} md={4} />
            <Grid item xs={10} md={4}>
                <Styles.Title>SWIFT DEX</Styles.Title>
                <Styles.Subtitle>Create a new wallet or import an existing one</Styles.Subtitle>

                <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
                <WalletCard
                    title="create wallet"
                    text="a new wallet will be created for you"
                    handleClick={handleCreateWallet}
                />
                <Link to="/wallet/import">
                    <WalletCard
                        title="import wallet"
                        text="this wallet must already exist"
                        // handleClick={handleImportWallet}
                    />
                </Link>

            </Grid>
            <Grid item xs={1} md={4} />
        </Grid>
    )
}

export default Landing