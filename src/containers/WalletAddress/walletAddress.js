import styled from 'styled-components'

export const Parent = styled.div`
    position: relative;
    overflow: hidden;
    margin-top: 150px;
    border-radius: 20px;

    @media(max-width: 1100px) {
        height: ${props => props.show ? '400px' : 'auto'};
    }

    @media(max-width: 600px) {
        height: ${props => props.show ? '600px' : 'auto'};
    }
`

export const WalletPassphrase = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 2;
    position: absolute;
    top: ${props => props.show ? 0 : '-600px'};
    transition: 400ms linear all;

    & .gridContainer {
        height: 100%;
        padding: 20px;
    
        & .wordsBox {
            display: flex;
            flex-flow: column wrap;
            height: 100%;

            & > div {
                width: 20%;

                @media(max-width: 1100px) {
                    width: 33%;
                }

                @media(max-width: 600px) {
                    width: 50%;
                }
            }
        }

        & .passphraseRight {
            position: relative;

            & > button:first-child {
                position: absolute;
                top: 0;
                right: 20px;
                @media(max-width: 900px) {
                  top: -200px;
                    
                }
            }

            & > button:last-child {
                position: absolute;
                bottom: 50px;
                right: 0;
                @media(max-width: 900px) {
                  bottom: 0;
                }
            }
        }
    }

    @media(max-width: 900px) {
        top: ${props => props.show ? 0 : '-600px'};
    }
`

export const WalletAddress = styled.div`
    background-color: white;
    padding: 25px 25px 55px 25px;
    box-shadow: 0px 8px 8px rgba(14, 181, 111, 0.06);
    z-index: 1;
    
    & .container {
        width: calc(100% - 30px);
        height: calc(100% - 50px);
        margin: auto;
    }

    & .welcome {
        font-size: 18px;
        font-weight: 500;
        color: #043923;
    }

    & .left {
        overflow-wrap: break-word;
        padding: 20px 20px 0 0;
        color: #043923;
        font-size: 17px;
        line-height: 25px;
        position: relative;

        & .copyIcon {
            position: absolute;
            left: 0;
            bottom: -20px;
            font-size: 28px;
            color: #097246;

            @media(max-width: 900px) {
                bottom: -40px;
            }
        }
    }

    & .center {
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px solid gray;
        border-right: 1px solid gray;

        @media(max-width: 900px) {
            border: none;
            margin-top: 50px;

            & .qrBox {
                padding: 30px 40px;
                border-top: 1px solid gray;
                border-bottom: 1px solid gray;
            }

        }
    }

    & .right {
        padding: 20px 0 0 20px;
        position: relative;

        & > button {
            position: absolute;
            bottom: -30px;
            right: 0;
        }
    }

    & .amount, .dollarAmount, .coinName {
        font-size: 20px;
        font-weight: 500;
        color: #043923;
    }

    .coinName {
        color: gray;
    }

    & .dollarAmount {
        margin: 30px auto;
    }
`

export const RippleSeed = styled.span`
    overflow-wrap: break-word;
    width: 100%;
    line-height: 25px;
`

export const QrCodeMainImgLoaderContainer = styled.div`
    width: 400px;
    height: 400px;
    display: ${props => props.show ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;

    @media(max-width: 600px) {
        width: 300px;
        margin-left: 0px;
    }

    @media(max-width: 400px) {
        width: 250px;
    }
`

export const QrCodeMainImg = styled.img`
    width: 400px;
    height: auto;
    margin-left: 50px;

    @media(max-width: 600px) {
        width: 300px;
        margin-left: 0px;
    }

    @media(max-width: 400px) {
        width: 250px;
    }
`
