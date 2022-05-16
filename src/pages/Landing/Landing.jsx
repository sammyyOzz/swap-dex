import { Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import WalletCard from '../../components/WalletCard/WalletCard'
import * as Styles from './landing'

function Landing() {

    return (
        <Grid container>
            <Grid item xs={1} md={4} />
            <Grid item xs={10} md={4}>
                <Styles.Title>SWIFT DEX</Styles.Title>
                <Styles.Subtitle>Create a new wallet or import an existing one</Styles.Subtitle>

                <Link to="/wallet/create">
                    <WalletCard
                        title="create wallet"
                        text="a new wallet will be created for you"
                    />
                </Link>

                <Link to="/wallet/import">
                    <WalletCard
                        title="import wallet"
                        text="this wallet must already exist"
                    />
                </Link>

            </Grid>
            <Grid item xs={1} md={4} />
        </Grid>
    )
}

export default Landing