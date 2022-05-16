import React from 'react'
import { Fragment } from 'react'
import { AssetItem } from '../../components/AssetItem/AssetItem'
import newAssetIcon from '../../assets/assetIcons/newAsset.png'
import optInIcon from  '../../assets/assetIcons/optIn.png'
import optOutIcon from  '../../assets/assetIcons/optOut.png'
import createChequeIcon from '../../assets/assetIcons/createCheque.png'
import createNftIcon from '../../assets/assetIcons/createNft.png'
import { Grid } from '@mui/material'

function AssetManagerRipple() {
    return (
        <Fragment>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#e7fdf3">
                    <div className="container">
                        <img src={newAssetIcon} alt="" />
                    </div>
                    <span>Create Currency</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#e5f2ff">
                    <div className="container">
                        <img src={optInIcon} alt="" />
                    </div>
                    <span>Opt-In</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#ffe5e6">
                    <div className="container">
                        <img src={optOutIcon} alt="" />
                    </div>
                    <span>Opt-Out</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#e5e9ff">
                    <div className="container">
                        <img src={createChequeIcon} alt="" />
                    </div>
                    <span>Create Cheque</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#f3e9fb">
                    <div className="container">
                        <img src={createNftIcon} alt="" />
                    </div>
                    <span>Create NFT</span>
                </AssetItem>
            </Grid>
        </Fragment>
    )
}

export default AssetManagerRipple
