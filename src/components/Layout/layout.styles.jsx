import styled from 'styled-components'
import blockchainImage from '../../assets/images/blockchain.jpg'

export const Root = styled.div`
    display: flex;
    min-height: 100%;
    background-image: url(${blockchainImage});
    overflow-x: hidden;

`

export const Overlay = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    background-color: #000000bc;
`

export const Bar = styled.div`
    width: 25%;
    height: 100%;
    box-sizing: border-box;
    padding: 25px;
    color: #ffffff;
    font-size: 25px;
    font-weight: bold;

    @media(max-width: 800px) {
        width: 5%;

        & > p {
            display: none;
        }
    }
`

export const Body = styled.div`
    width: 50%;
    background-color: white;
    margin: 30px auto;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 30px;

    @media(max-width: 800px) {
        width: 90%;
    }
`