import styled from 'styled-components'

export const Root = styled.div`
    width: 100%;
    background-color: white;
    padding: 20px 0;
    box-shadow: 0px 8px 8px rgba(14, 181, 111, 0.06);
    border-radius: 12px;
    margin-bottom: 20px;
    transition: 200ms linear all;
    cursor: pointer;

    &:hover {
        transform: scale(1.02);
        transition: 200ms linear all;
        box-shadow: 0px 10px 10px #cfd8dc;
    }

`

export const Container = styled.div`
    width: calc(100% - 30px);
    margin: auto;
    display: flex;

    & > button {
        @media(min-width: 800px) {
            margin: auto;
            width: 80%;
        }
    }
`

export const Icon = styled.div`
    width: 50px;
    height: 50px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => !props.showLogo ? '#F5FEFA' : 'transparent'};
    border-radius: 10px;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`

export const Title = styled.h2`
    color: #043923;
    margin-top: 0;
    font-size: 22px;
    font-weight: 600;
    text-transform: uppercase;
`

export const Text = styled.p`
    color: #3E554B;
    font-size: 16px;
    margin-bottom: 17px;
`