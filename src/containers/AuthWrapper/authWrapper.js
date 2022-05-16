import styled from 'styled-components'

export const Root = styled.div`
    display: flex;
    justify-content: center;
    /* background-color: red; */
    /* min-height: calc(100vh - 100px); */
    /* min-height: 600px; */
    height: auto;
    margin: 60px auto 120px auto;

    & > .container {
        width: 85%;
        min-height: calc(100vh - 150px);
        display: flex;

        @media(max-width: 800px) {
            width: 100%;
        }

        & > .left {
            background-color: #097246;
            width: 35%;
            min-height: 700px;

            @media(max-width: 800px) {
                display: none;
            }

            & > p {
                color: white;
                width: 80%;
                margin: 50px auto auto auto;
                line-height: 25px;
                font-size: 22px;
                font-weight: bold;
            }
        }

        & > .right {
            background-color: #F5FEFA;
            width: 65%;
            /* height: 90%;
            min-height: 90%; */

            @media(max-width: 800px) {
                width: 100%;
            }
        }
    }

`


