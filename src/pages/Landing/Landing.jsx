import { Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import WalletCard from '../../components/WalletCard/WalletCard'
import * as Styles from './landing'
import { useDispatch } from 'react-redux'
import { createAccount } from '../../app/swift/swiftSlice'

function Landing() {
    const dispatch = useDispatch()

    const handleCreateWallet = () => {
        if (localStorage.getItem('swift_dex')) {
            return
        } else {
            dispatch(createAccount())
            .unwrap()
            .then(data => {
                alert(data)
            })
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