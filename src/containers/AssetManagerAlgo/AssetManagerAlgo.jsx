import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { AssetItem } from '../../components/AssetItem/AssetItem'
import newAssetIcon from '../../assets/assetIcons/newAsset.png'
import optInIcon from  '../../assets/assetIcons/optIn.png'
import optOutIcon from  '../../assets/assetIcons/optOut.png'
import freezeIcon from  '../../assets/assetIcons/freeze.png'
import unfreezeIcon from  '../../assets/assetIcons/unfreeze.png'
import clawbackIcon from  '../../assets/assetIcons/clawback.png'
import modifyIcon from  '../../assets/assetIcons/modify.png'
import destroyIcon from  '../../assets/assetIcons/destroy.png'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import useModal from '../../Hooks/Modal'
import Modal from '../../components/UI/Modal/Modal'
import { CLAWBACK, DESTROY, FREEZE, MODIFY, OPT_IN, OPT_OUT, UNFREEZE, CLAWBACK_RES, DESTROY_RES, FREEZE_RES, MODIFY_RES, OPT_IN_RES, OPT_OUT_RES, UNFREEZE_RES } from './constants'
import OptIn from './manageAssets/OptIn'
import OptOut from './manageAssets/OptOut'
import Freeze from './manageAssets/Freeze'
import Unfreeze from './manageAssets/Unfreeze'
import Clawback from './manageAssets/Clawback'
import Modify from './manageAssets/Modify'
import Destroy from './manageAssets/Destroy'
import OptInRes from './manageAssetsResponse/OptInRes'
import OptOutRes from './manageAssetsResponse/OptOutRes'
import FreezeRes from './manageAssetsResponse/FreezeRes'
import UnfreezeRes from './manageAssetsResponse/UnfreezeRes'
import ClawbackRes from './manageAssetsResponse/ClawbackRes'
import ModifyRes from './manageAssetsResponse/ModifyRes'
import DestroyRes from './manageAssetsResponse/DestroyRes'


function AssetManagerAlgo() {
    const { modalState, handleModalOpen, handleModalClose } = useModal()
    const [modalDisplay, setModalDisplay] = useState('')
    const [modalFullScreenForMobile, setModalFullScreenForMobile] = useState(false)


    const handleOptInModal = () => {
        setModalDisplay(OPT_IN)
        setModalFullScreenForMobile(true)
        handleModalOpen();
    }

    const handleOptOutModal = () => {
        setModalDisplay(OPT_OUT)
        setModalFullScreenForMobile(true)
        handleModalOpen();
    }

    const handleFreezeModal = () => {
        setModalDisplay(FREEZE)
        setModalFullScreenForMobile(true)
        handleModalOpen();
    }

    const handleUnfreezeModal = () => {
        setModalDisplay(UNFREEZE)
        setModalFullScreenForMobile(true)
        handleModalOpen();
    }

    const handleClawbackModal = () => {
        setModalDisplay(CLAWBACK)
        setModalFullScreenForMobile(true)
        handleModalOpen();
    }

    const handleModifyModal = () => {
        setModalDisplay(MODIFY)
        setModalFullScreenForMobile(true)
        handleModalOpen();
    }

    const handleDestroyModal = () => {
        setModalDisplay(DESTROY)
        setModalFullScreenForMobile(true)
        handleModalOpen();
    }

    /**
     * response handlers
     */
    const handleOptInRes = () => {
        setModalDisplay(OPT_IN_RES)
        setModalFullScreenForMobile(false)
        handleModalOpen();
    }

    const handleOptOutRes = () => {
        setModalDisplay(OPT_OUT_RES)
        setModalFullScreenForMobile(false)
        handleModalOpen();
    }

    const handleFreezeRes = () => {
        setModalDisplay(FREEZE_RES)
        setModalFullScreenForMobile(false)
        handleModalOpen();
    }

    const handleUnfreezeRes = () => {
        setModalDisplay(UNFREEZE_RES)
        setModalFullScreenForMobile(false)
        handleModalOpen();
    }

    const handleClawbackRes = () => {
        setModalDisplay(CLAWBACK_RES)
        setModalFullScreenForMobile(false)
        handleModalOpen();
    }

    const handleModifyRes = () => {
        setModalDisplay(MODIFY_RES)
        setModalFullScreenForMobile(false)
        handleModalOpen();
    }

    const handleDestroyRes = () => {
        setModalDisplay(DESTROY_RES)
        setModalFullScreenForMobile(false)
        handleModalOpen();
    }




    return (
        <Fragment>
            <Modal open={modalState} handleClose={handleModalClose} fullScreenForMobile={modalFullScreenForMobile}>
                
                { modalDisplay === OPT_IN && <OptIn handleModalClose={handleModalClose} handleResponse={handleOptInRes} /> }
                { modalDisplay === OPT_OUT && <OptOut handleModalClose={handleModalClose} handleResponse={handleOptOutRes} /> }
                { modalDisplay === FREEZE && <Freeze handleModalClose={handleModalClose} handleResponse={handleFreezeRes} /> }
                { modalDisplay === UNFREEZE && <Unfreeze handleModalClose={handleModalClose} handleResponse={handleUnfreezeRes} /> }
                { modalDisplay === CLAWBACK && <Clawback handleModalClose={handleModalClose} handleResponse={handleClawbackRes} /> }
                { modalDisplay === MODIFY && <Modify handleModalClose={handleModalClose} handleResponse={handleModifyRes} /> }
                { modalDisplay === DESTROY && <Destroy handleModalClose={handleModalClose} handleResponse={handleDestroyRes} /> } 

                { modalDisplay === OPT_IN_RES && <OptInRes /> }
                { modalDisplay === OPT_OUT_RES && <OptOutRes /> }
                { modalDisplay === FREEZE_RES && <FreezeRes /> }
                { modalDisplay === UNFREEZE_RES && <UnfreezeRes /> }
                { modalDisplay === CLAWBACK_RES && <ClawbackRes /> }
                { modalDisplay === MODIFY_RES && <ModifyRes /> }
                { modalDisplay === DESTROY_RES && <DestroyRes /> }
                
            </Modal>
            <Grid item xs={6} md={4} lg={2}>
                <Link to="/new-assets" style={{ textDecoration: 'none' }}>
                    <AssetItem color="#e7fdf3">
                        <div className="container">
                            <img src={newAssetIcon} alt="" />
                        </div>
                        <span>New Asset</span>
                    </AssetItem>
                </Link>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#e5f2ff" onClick={handleOptInModal}>
                    <div className="container">
                        <img src={optInIcon} alt="" />
                    </div>
                    <span>Add Asset</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#ffe5e6" onClick={handleOptOutModal}>
                    <div className="container">
                        <img src={optOutIcon} alt="" />
                    </div>
                    <span>Remove Asset</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#f3f2f3" onClick={handleFreezeModal}>
                    <div className="container">
                        <img src={freezeIcon} alt="" />
                    </div>
                    <span>Freeze</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#e5e9ff" onClick={handleUnfreezeModal}>
                    <div className="container">
                        <img src={unfreezeIcon} alt="" />
                    </div>
                    <span>Unfreeze</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#f3e9fb" onClick={handleClawbackModal}>
                    <div className="container">
                        <img src={clawbackIcon} alt="" />
                    </div>
                    <span>Clawback</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#e9ecfc" onClick={handleModifyModal}>
                    <div className="container">
                        <img src={modifyIcon} alt="" />
                    </div>
                    <span>Modify</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#ffe5e6" onClick={handleDestroyModal}>
                    <div className="container">
                        <img src={destroyIcon} alt="" />
                    </div>
                    <span>Delete Asset</span>
                </AssetItem>
            </Grid>
        </Fragment>
    )
}

export default AssetManagerAlgo
