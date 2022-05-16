import { Grid } from '@mui/material'
import React from 'react'
import * as Styles from'./formControl'

function Input({ half, label, helperText, error, value, options, handleClick }) {

    return (
        <Grid item xs={ half ? 6 : 12 }>
            <Styles.Root>
                <label>{label}</label>
                    <Styles.RadioContainer>
                        {
                            options?.map((option) => (
                                <Styles.SingleRadioBox key={option} onClick={() => handleClick(option)}>
                                    <Styles.RadioOptionCircle checked={value === option} />
                                    <Styles.RadioOptionText>{option}</Styles.RadioOptionText>
                                </Styles.SingleRadioBox>
                            ))
                        }
                        
                    </Styles.RadioContainer>
                <Styles.HelperText error={error}>{helperText}</Styles.HelperText>

            </Styles.Root>
        </Grid>
    )
}

export default React.memo(Input)
