import React from 'react'
import * as Styles from './modalResponse'
import successImg from '../../assets/icons/success.png'
import errorImg from '../../assets/icons/error.png'
import { Button } from '../UI/Button/button'

function ModalResponse({ success, title, description, handleClick, buttonText, hideImageAndTitle }) {

    return (
        <Styles.Root>
            { !hideImageAndTitle && (
                <>
                    <img src={ success ? successImg : errorImg } alt="" />
                    <Styles.Title>{ title || "" }</Styles.Title>
                </>
            )}
            <Styles.Description>{ description || "" }</Styles.Description>
            {
                handleClick && <Button>{ buttonText }</Button>
            }
        </Styles.Root>
    )
}

export default ModalResponse
