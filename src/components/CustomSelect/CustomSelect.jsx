import React, { useEffect } from 'react'
import * as Styles from './customSelect'
import { HTTP_STATUS } from '../../constants/httpStatus';
import { LoaderContainer } from '../../pages/Exchange/exchange';
import { useDispatch, useSelector } from 'react-redux';
import { getAlgorandHoldings } from '../../app/algorand/algorandSlice';
import useCheckImageExists from '../../Hooks/checkImageExists';
import { Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ThreeDots } from 'react-loader-spinner'


export function CustomSelectBox({ id, name, unit, handleClick, isDropdownItem }) {
    const { tinyManAssetImage } = useCheckImageExists({ id })

    return (
        <Styles.SelectionBox dropdownItem={isDropdownItem} onClick={handleClick}>
            <Styles.Logo src={tinyManAssetImage} alt="" />
            <Styles.NameBox>
                <div className="title">{name}</div>
                <div className="subtitle">{`$${unit} ${id !== 0 ? '-' : ''} ${id !== 0 ? id : ''} `}</div>
            </Styles.NameBox>
        </Styles.SelectionBox>
    )
}

export function CustomDropdownContainer(props) {
    const { dropdownIsOpen, dropdownItems, setDropdownIsOpen, handleDropdownItemClick, handleSetInputValue, inputValueToSet, searchStatus, ...otherProps } = props
    
    const dispatch = useDispatch()
    const { status: holdingsStatus } = useSelector(state => state.algorand.holdings)

    const handleItemClick = (dropdownItem) => {
        handleDropdownItemClick(dropdownItem)
        handleSetInputValue && handleSetInputValue(inputValueToSet ? dropdownItem[inputValueToSet] : '')
        setDropdownIsOpen(false)
    }

    useEffect(() => {
        if (dropdownIsOpen && (holdingsStatus === null)) {
            dispatch(getAlgorandHoldings())
        }
    }, [dropdownIsOpen])

    return (
        // <ClickAwayListener onClickAway={() => dropdownIsOpen && setDropdownIsOpen(false)}>
            <Styles.DropdownContainer open={dropdownIsOpen} { ...otherProps }>
                { dropdownItems.length > 0 ? dropdownItems.map(({ id, ...dropdownItemDetails }) => (
                    <CustomSelectBox 
                        key={id} 
                        id={id}
                        isDropdownItem 
                        handleClick={() => handleItemClick({ id, ...dropdownItemDetails })}
                        { ...dropdownItemDetails } 
                    />
                )) : (
                    <LoaderContainer>
                        <span>No assets found</span>
                    </LoaderContainer>
                )}


                { ((holdingsStatus === HTTP_STATUS.PENDING) || (searchStatus === HTTP_STATUS.PENDING)) ? (
                    <LoaderContainer>
                        <ThreeDots
                            height="30"
                            width="150"
                            color='gray'
                            ariaLabel='loading'
                        />
                    </LoaderContainer>
                ) : null }
            </Styles.DropdownContainer>
        // </ClickAwayListener>
    )
}

export function CustomSelectInput({ ...props }) {

    return (
        <Styles.Input
            { ...props }
        />
    )
}


const selectBoxStyle = {
    height: '65px',
    border: '2px solid #043923',
    borderRadius: '16px',
    fontSize: '18px',
    width: '100%',
    marginBottom: '18px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
}

export function SelectBox({ id, name, amount, unit, handleClick, hideArrowIcon, label, ...inputBoxProps }) {
    const { tinyManAssetImage } = useCheckImageExists({ id })

    return (
        <>
            <Styles.Label>{label}</Styles.Label>

            <Grid item xs={12} sx={selectBoxStyle}>
                <Styles.SelectBoxLeft onClick={handleClick}>
                    <div className="left">
                        <img src={tinyManAssetImage} alt="" />
                        <span>{unit}</span>
                    </div>

                    { !hideArrowIcon && <KeyboardArrowDownIcon /> }
                </Styles.SelectBoxLeft>

                <Styles.SelectBoxRight>
                    <input { ...inputBoxProps } />
                </Styles.SelectBoxRight>
            </Grid>
        </>
    )
}