import styled from 'styled-components'

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    padding-bottom: 50px;

    & thead:first-child {
        background-color: #E7FDF3;
    }

    & th:first-child, td:first-child {
        padding-left: 20px;
    }

    & th:last-child, td:last-child {
        padding-right: 20px;
    }

    & th, td {
        padding: 8px;
        text-align: left;
        min-width: 150px;
        @media(max-width: 800px) {
            padding: 3px;
        }
    }

    & td {
        border-bottom: 2px solid #E7FDF3;
        height: 55px;
        color: #043923;
        font-size: 18px;
        max-width: 250px;
        /* white-space: nowrap; */
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & th {
        padding-top: 30px;
        padding-bottom: 15px;
        text-transform: uppercase;
        font-size: 20px;
        font-weight: 500;
        color: #3E554B;
    }

    & a {
        color: #097246;
    }

    & .hide-on-mobile {
        @media(max-width: 800px) {
            display: none;
        }
    }
`

export const EmptyTable = styled.div`
    text-align: center;
    margin: 100px auto 0 auto;
    width: calc(100% - 100px);

    & > h1 {
        font-weight: 600;
        font-size: 28px;
        margin-bottom: 50px;
        color: #043923;
        text-transform: uppercase;
    }
    & > p {
        font-size: 18px;
        color: #3E554B;
    }
`