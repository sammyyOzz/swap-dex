import styled from 'styled-components'

export const Root = styled.div`
    display: flex;
    min-height: 100%;
`

export const Left = styled.div`
    width: 29%;
    background-color: white;

    @media(max-width: 800px) {
        display: none;
    }
`

export const Right = styled.div`
    width: 72%;
    background-color: #F5FEFA;

    @media(max-width: 800px) {
        width: 100%;
    }
`

export const RightContainer = styled.div`
    width: calc(100% - 50px);
    margin: 0 auto;

    @media(max-width: 800px) {
        width: calc(100% - 20px);
    }
`