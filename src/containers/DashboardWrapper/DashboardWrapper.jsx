import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import * as Styles from './dashboardWrapper'

function DashboardWrapper({ children }) {
    
    return (
        <Styles.Root>
            <Styles.Left>
                <Sidebar />
            </Styles.Left>

            <Styles.Right>
                <Styles.RightContainer>
                    { children }
                </Styles.RightContainer>
            </Styles.Right>
        </Styles.Root>
    )
}

export default DashboardWrapper
