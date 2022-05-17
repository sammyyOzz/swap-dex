import React from 'react'
import * as Styles from './layout.styles'

function Layout({ children, leftText, rightText }) {

    return (
        <Styles.Root>
            <Styles.Overlay>
                <Styles.Bar>
                    <p>{ leftText }</p>
                </Styles.Bar>

                <Styles.Body>
                    { children }
                </Styles.Body>

                <Styles.Bar>
                    <p>{ rightText }</p>
                </Styles.Bar>
            </Styles.Overlay>
        </Styles.Root>
    )
}

export default Layout