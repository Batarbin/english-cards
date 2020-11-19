import React, { FC } from 'react'

interface InputCancelButtonI {
    clearFunction: () => void
}

export const InputCancelButton: FC<InputCancelButtonI> = ({ clearFunction }) => {
    return (
        <span className="input_clear_button" onClick={clearFunction}>&times;</span>
    )
}