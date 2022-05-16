import React, { useImperativeHandle, useRef } from 'react'
import { Grid } from '@mui/material'
import * as Styles from'./formControl'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const FormControl = React.forwardRef((props, ref) => {
    const { half, label, name, type, placeholder, errorText, value, handleChange, handleBlur, toggleShowPassword, icon, center, textArea, handleClick, readOnly, ...otherProps } = props;

    const inputRef = useRef()

    const click = () => {
        inputRef.current.click()
    }

    useImperativeHandle(ref, () => {
        return {
            click: click
        }
    })

    return (
        <Grid item xs={ half ? 6 : 12 }>
            <Styles.Root center={center}>
                <label>{label}</label>
                {
                    !textArea ? 
                    <Styles.CustomInput
                        icon={icon}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        center={center}
                        ref={inputRef}
                        onClick={handleClick}
                        readOnly={readOnly}
                        max={otherProps.max}
                        maxLength={otherProps.maxLength}
                        exchange={otherProps.exchange}
                        onFocus={otherProps.handleFocus}
                        whiteBackground={otherProps.whiteBackground}
                    /> :
                    <Styles.TextArea
                        icon={icon}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        center={center}
                    /> 
                }
                <Styles.HelperText>{errorText}</Styles.HelperText>

                {
                    typeof(icon) === 'boolean' && (
                        type === 'password' 
                        ?   <VisibilityOutlinedIcon className="icon" onClick={toggleShowPassword} /> 
                        :   <VisibilityOffOutlinedIcon className="icon" onClick={toggleShowPassword} /> 
                    ) 
                }
                {
                    typeof(icon) === "string" && (
                        <img src={icon} alt="" className="icon" onClick={otherProps.handleIconClick} />
                    )
                }
            </Styles.Root>
        </Grid>
    )
})

export default FormControl
