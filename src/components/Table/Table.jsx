import React, { Fragment } from 'react'
import * as Styles from './table'

function Table({ columnTitles, rows, noDataTitle, noDataText, columnsToHideOnMobile }) {

    return (
        <Fragment>
            <Styles.Table>
                <thead>
                    <tr>
                        { columnTitles?.map((item, i) => (
                            <th key={i} className={columnsToHideOnMobile?.includes(i) ? 'hide-on-mobile' : ''}>{item}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    { rows }
                </tbody>
                
            </Styles.Table>

            {
                (!rows || rows.length === 0) && (
                    <Styles.EmptyTable>
                        <h1>{noDataTitle}</h1>
                        <p>{noDataText}</p>
                    </Styles.EmptyTable>
                )
            }
            
        </Fragment>
    )
}

export default Table
