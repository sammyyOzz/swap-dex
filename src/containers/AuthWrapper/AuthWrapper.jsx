import React from 'react'
import * as Styles from './authWrapper'

function AuthWrapper({ children }) {

    return (
        <Styles.Root>
            <div className="container">
                <div className="left">
                    <p>Getting started on Mint Engine is just a few clicks away.</p>
                </div>
                <div className="right">
                    { children }
                </div>
            </div>
        </Styles.Root>
    )
}

export default AuthWrapper
