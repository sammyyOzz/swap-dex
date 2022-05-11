import styled from 'styled-components'

export const SelectionBox = styled.div`
    height: 80px;
    background-color: ${p => p.dropdownItem ? '#E7FDF3' : 'white'};
    border-radius: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;

    &:hover {
        background-color: ${p => p.dropdownItem ? '#097246' : 'white'};
        color: ${p => p.dropdownItem ? 'white' : 'inherit'};
        transition: 300ms linear all;
    }
`

export const Logo = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin: auto 30px;
`

export const NameBox = styled.div`
    & > .title {
        font-weight: 600;
        font-size: 20px;
        margin-bottom: 7px;
    }

    & > .subtitle {
        text-transform: uppercase;

    }
`

export const DropdownContainer = styled.div`
    position: absolute;
    background-color: #E7FDF3;
    width: 100%;
    z-index: 2;
    top: ${p => p.lower ? '120px' : '80px'};
    border-radius: 8px 8px 20px 20px;
    overflow: hidden;
    display: ${props => props.open ? 'block' : 'none'};
    max-height: 400px;
    overflow-x: hidden;
    overflow-y: scroll;
    border: 1px solid #E7FDF3;
    box-shadow: -4px -4px 5px 5px #f5f5f5;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background-color: #E7FDF3;
        border-radius: 50px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #b0bec5;
        border-radius: 50px;
    }

    @media(max-width: 800px) {
        top: 83px;
    }
`

export const Input = styled.input`
    height: 80px;
    background-color: white;
    border-radius: 20px;
    border: 1px solid transparent;
    margin-top: 5px;
    width: 100%;
    box-sizing: border-box;
    font-size: 30px;
    padding: 0 30px;
    color: gray;

    &:focus {
        outline: none;
    }

    &::placeholder {
        font-size: ${p => p.smallerPlaceholderSize && '18px'};

        @media(max-width: 600px) {
            font-size: ${p => p.smallerPlaceholderSize && '15px'};
        }
    }
`


/**
 * other select input 
 */

export const Label = styled.label`
    font-weight: 500;
    font-size: 18px;
    color: #043923;
    padding-bottom: 7px;
`

export const SelectBoxLeft = styled.div`
    width: 45%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #E7FDF3;
    cursor: pointer;
    position: absolute;
    top: 0;

    & > .left {
        display: flex;
        align-items: center;
        height: 100%;
        width: 90%;
        text-transform: uppercase;
        
        & > img {
            height: 30px;
            width: 30px;
            border-radius: 50%;
            margin: auto 10px auto 10px;

            @media(max-width: 800px) {
                height: 22px;
                width: 22px;
            }
        }
        & > span {
            font-size: 20px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            @media(max-width: 800px) {
                font-size: 16px;
            }
        }
    }
`

export const SelectBoxRight = styled.div`
    width: 55%;
    height: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
    position: absolute;
    top: 0;
    right: 0;

    & > input {
        color: gray;
        border: none;
        height: 100%;
        font-size: 24px;
        text-align: right;
        max-width: calc(100% - 10px);
        
        &:focus {
            outline: none;
        }

        &::placeholder {
            color: #bdbdbd;
        }
    }
`