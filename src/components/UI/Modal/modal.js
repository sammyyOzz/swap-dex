import styled from 'styled-components'

export const ModalBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    background-color: white;
    padding: 20px;
    border-radius: 15px;

    @media(max-width: 600px) {
        width: ${props => props.fullScreen ? '100%' : '300px'};
        height: ${props => props.fullScreen && '100%'};
    }
    @media(max-width: 400px) {
        width: ${props => !props.fullScreen && '250px'};
    }
`

export const ModalContent = styled.div`
    width: 100%;
    overflow-y: scroll;
    max-height: calc(100vh - 100px);
    padding-right: 20px;
    padding-top: 20px;

    @media(max-width: 600px) {
        margin: ${props => props.fullScreen && 'auto'};
        overflow-x: ${props => props.fullScreen && 'hidden'};
        width: ${props => props.fullScreen && 'calc(100% - 40px)'};
        padding: ${props => props.fullScreen && '40px 25px 40px 15px'};
        max-height: ${props => props.fullScreen && 'calc(100% - 60px)'};

        padding-top: ${props => !props.fullScreen && '30px'}
    }
`

export const CloseModalBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background-color: #F5FEFA;
    color: #043923;
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 15px;
    z-index: 1;

    @media(max-width: 600px) {
        right: 30px;
        top: 30px;
    }
`