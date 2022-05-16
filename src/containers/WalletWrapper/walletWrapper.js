import styled from 'styled-components'

export const Root = styled.div`
    & > .container {
        /* width: 80%; */
        margin: 0 auto;
        border: 1px solid green;

        @media(max-width: 800px) {
            width: 90%;
        }
    }
`

export const Title = styled.h1`
    color: #043923;
    text-transform: uppercase;
    margin: 50px auto 10px auto;
    position: relative;
    font-size: 32px;
    font-weight: 600;

    @media (max-width: 800px) {
        margin: 70px auto 10px auto;
    }

    & > a {
        color: #043923;
        text-decoration: none;
    }

    & .goBackArrow {
        top: 7px;
        left: -50px;
        position: absolute;
        cursor: pointer;

        @media (max-width: 900px) {
            left: -30px;
        }

        @media (max-width: 800px) {
            top: -40px;
            left: 0px;
        }
    }
`

export const Description = styled.p`
    color: #3E554B;
    font-size: 18px;
    line-height: 22px;
    margin: 13px auto 40px auto;
`