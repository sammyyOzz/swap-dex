import styled from 'styled-components'

export const Button = styled.button`
    background-color: ${props => props.outlined ? 'transparent' : '#0EB56F'};
    color: ${props => props.outlined ? '#0EB56F' : '#FFFFFF'};
    text-transform: uppercase;
    width: ${props => props.fullWidth ? '100%' : props.wide ? 'calc(100% - 30px)' : 'auto'};
    padding: 25px 45px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 12px;
    border: ${props => props.outlined ? '1px solid #0EB56F' : 'none'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? '0.5' : '1.0'};

    @media(max-width: 800px) {
        padding: 15px 18px;
    }
`

export const CopyButton = styled(Button)`
    padding: 12px 20px;
    position: absolute;
    right: 0;
    top: -60px;
    display: flex;
    align-items: center;
`

export const WalletAddressButton = styled(Button)`
    padding: 10px;
    background-color: #E7FDF3;
    text-transform: none;
    color: #0EB56F;
    border-radius: 18px;
`

export const UploadImageButton = styled(WalletAddressButton)`
    background-color: #0EB56F;
    color: white;
`