import React from 'react'
import * as Styles from './walletCard'
import { Button } from '../UI/Button/button'
import { Link } from 'react-router-dom'

function WalletCard({ icon, walletSetup, buttonText, title, text, image, link, handleClick }) {

    return (
        <Styles.Root onClick={handleClick}>
            <Styles.Container>
                <Styles.Icon showLogo={walletSetup}>
                    { 
                        walletSetup
                            ? <img src={image} alt="" />
                            : icon
                    }
                </Styles.Icon>
                <div>
                    <Styles.Title>{ title }</Styles.Title>
                    <Styles.Text>{ text }</Styles.Text>
                </div>
            </Styles.Container>

            {/* <Styles.Container>
                {
                    !walletSetup && (
                        <Button fullWidth onClick={handleClick}>{ buttonText }</Button>
                    )
                }
            </Styles.Container> */}
        </Styles.Root>
    )
}

export default React.memo(WalletCard)
