import styled from 'styled-components'

const Box = styled.div`
    box-shadow: 0px 8px 8px rgba(14, 181, 111, 0.06);
    background-color: white;
`

export const HeaderBox = styled(Box)`
    padding: 15px 20px 0px 25px;
    margin: 150px auto 20px auto;
    border-radius: 20px 20px 0 0;
    position: relative;
    & .arrowIcon {
        position: absolute;
        top: -100px;
        left: 0;
        font-size: 30px;
        cursor: pointer;
        color: #043923;
    }
    & > h2 {
        color: #043923;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 40px;
    }
`

export const BoxContainer = styled(Box)`
    width: 100%;
    height: auto;
    border-radius: 25px;
    padding-bottom: 50px;
    margin-bottom: 30px;
    & > .container {
        width: calc(100% - 50px);
        height: calc(100% - 50px);
        padding-top: 20px;
        margin: auto;
    }
`

export const Title = styled.h2`
    color: #043923;
    font-weight: 600;
    font-size: 22px;
    text-transform: uppercase;
`

export const Description = styled.p`
    color: #3E554B;
    line-height: 24px;
    font-size: 16px;

`

export const UploadImageBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    & > img {
        margin-right: 20px;
    }
    & > span {
        margin-left: 20px;
        max-width: calc(100% - 250px);
        /* white-space: nowrap;  */
        overflow: hidden;
        text-overflow: ellipsis;
    }
`

export const CalcResult = styled.p`
    color: #2a5744;
    margin-top: -8px;
`

export const TableBox = styled(Box)`
    border-radius: 0 0 20px 20px;
    margin-bottom: 40px;
    min-height: 600px;
    max-height: 800px;
    overflow-y: scroll;
    overflow-x: auto;
`

export const LoaderContainer = styled.div`
    width: 100%;
    & svg {
        margin: 0px auto 0 auto;
    }
`

export const Label = styled.p`
    font-size: 18px;
    font-weight: 500;
    color: #043923;
    width: 100%;
    padding-bottom: 0px;
`

export const TransactionFee = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    & > img {
        margin-right: 15px;
        height: 30px;
        width: 30px;
        border-radius: 50%;
    }

    & > p {
        font-size: 18px;
        font-weight: 500;
        color: #3E554B;
        margin: 0;
    }
`