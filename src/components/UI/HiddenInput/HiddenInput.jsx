import React from 'react'

function HiddenInput({ name, handleChange, hiddenInputRef }) {

    return (
        <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name={name}
            ref={hiddenInputRef}
            onChange={handleChange}
            style={{ display: 'none' }}
        />
    )
}

export default HiddenInput
