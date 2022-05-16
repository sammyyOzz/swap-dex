import { Grid } from '@mui/material'
import React from 'react'
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

    const handleCreateWallet = () => {
        if (localStorage.getItem('swift_dex')) {
            return
        } else {
            
            handleSubmit(
                createAccount(),
                (data) => {
                    localStorage.setItem('swift_dex', JSON.stringify(data));
                    saveAccountDetails(data)
                    navigate('/wallet/create')
                },
                err => {
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