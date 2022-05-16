import React, { Fragment, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getCreatedAssets } from '../../app/algorand/algorandSlice'
import Table from '../../components/Table/Table'
import * as SharedStyles from '../../components/UI/DashboardShared/dashboardShared'
import { HTTP_STATUS } from '../../constants/httpStatus'


function CreatedAssetsRipple() {
    const dispatch = useDispatch()
    const { status, data } = useSelector(state => state.algorand.createdAssets)

    useEffect(() => {
        if (status === null) {
            dispatch(getCreatedAssets())
        }
    }, [status])

    const rows = data?.asset_created?.map((item, i) => (
        <tr key={item.id}>
            <td><a href={`https://testnet.algoexplorer.io/asset/${item.id}`} target="_blank">{item.id}</a></td>
            <td>{item.name}</td>
            <td className="hide-on-mobile">{item.unit}</td>
            <td className="hide-on-mobile">{item.url}</td>
            <td className="hide-on-mobile">{item.date}</td>
        </tr>
    ))

    return (
        <Fragment>
            {
                status === HTTP_STATUS.PENDING ? (
                    <SharedStyles.LoaderContainer>
                        <ThreeDots height="250" width="250" color='gray' />
                    </SharedStyles.LoaderContainer>
                ) : (
                    <Table
                        columnTitles={['asset name', 'amount', 'hot address', 'cold address', 'date']}
                        columnsToHideOnMobile={[2, 3, 4]}
                        rows={rows}
                        noDataTitle="NO ASSET MANAGEMENT ACTIVITY YET"
                        noDataText="You don’t have any activity that can be displayed yet."
                    /> 
                )
            }
        </Fragment>
    )
}

export default CreatedAssetsRipple