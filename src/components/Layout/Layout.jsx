import React from 'react'
import * as Styles from './layout.styles'

function Layout({ children, leftText, rightText, fullScreen }) {

    return (
        <Styles.Root>
            <Styles.Overlay>
                <Styles.Bar fullScreen={fullScreen}>
                    <p>{ leftText }</p>
                </Styles.Bar>

                <Styles.Body fullScreen={fullScreen}>
                    { children }
                </Styles.Body>

                <Styles.Bar fullScreen={fullScreen}>
                    <p>{ rightText }</p>
                </Styles.Bar>
            </Styles.Overlay>
        </Styles.Root>
    )
}

export default Layout