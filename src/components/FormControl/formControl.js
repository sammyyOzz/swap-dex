import styled from 'styled-components'

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    & > label {
        font-size: 18px;
        font-weight: 500;
        color: #043923;
        padding-bottom: 7px;
    }

    & .icon {
        color: #0EB56F;
        position: absolute;
        cursor: pointer;
        right: 20px;
        top: 50px;

        @media(max-width: 800px) {
            top: 40px;
            right: 15px;
        }
    }

    &   input[type=date]::-webkit-inner-spin-button, 
        input[type=date]::-webkit-calendar-picker-indicator,
        input[type=date]::-webkit-cancel-icon {
            display: none;
            -webkit-appearance: none;
    }

    &   input[type=date] {
        width: calc(100% - 2px);
        padding: 0;
        text-align: center;
    }

    &   input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

    &   input[type=number] {
            -moz-appearance: textfield;
        }

`

export const CustomInput = styled.input`
    height: ${props => !props.exchange ? '65px' : '58px'};
    padding-left: 15px;
    padding-right: ${props => props.icon ? '58px' : '15px'};
    /* margin: 10px 0px 20px 0px; */
    border: ${props => !props.exchange ? '2px solid #043923' : 'none'};
    border-radius: 16px;
    background-color: ${props => (!props.exchange && !props.whiteBackground) ? 'transparent' : 'white'};
    font-size: 18px;
    text-align: ${props => props.center ? 'center' : 'left'};

    @media(max-width: 800px) {
        height: 45px;
        font-size: 16px;
    }

    ::placeholder {
        color: #bdbdbd;
    }

    &:focus {
        outline: none;
        border: ${props => !props.exchange ? '2px solid #0EB56F' : 'none'};
    }
`

export const TextArea = styled.textarea`
    height: 130px;
    padding-left: 15px;
    padding-right: ${props => props.icon ? '58px' : '15px'};
    border: 2px solid #043923;
    border-radius: 16px;
    background-color: transparent;
    font-size: 18px;
    text-align: ${props => props.center ? 'center' : 'left'};
    resize: none;

    &:focus {
        outline: none;
        border: 2px solid #0EB56F;
    }
`

export const HelperText = styled.span`
    margin-top: 5px;
    margin-bottom: 5px;
    color: red;
    font-size: 15px;
`

export const RadioContainer = styled.div`
    display: flex;
`

export const SingleRadioBox = styled.div`
    height: 30px;
    width: 200px;
    margin-right: 15px;
    display: flex;
    align-items: center;
    border: 2px solid #043923;
    cursor: pointer;
`

export const RadioOptionCircle = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid #043923;
    border-radius: 50%;
    margin: auto 10px;
    background-color: ${props => props.checked ? 'green' : 'white'};
`

export const RadioOptionText = styled.span`
    font-size: 15px;
    color: #043923;
`