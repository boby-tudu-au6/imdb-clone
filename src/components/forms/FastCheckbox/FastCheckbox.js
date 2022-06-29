import React from 'react'
import { FormControlLabel, Checkbox } from '@mui/material'
import { Controller } from 'react-hook-form'

function FastCheckbox({ name, control, ...rest }) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => {
                return (
                    <FormControlLabel
                        control={<Checkbox checked={value} onChange={e => onChange(e.target.checked)} />}
                        {...rest}
                    />
                );
            }}
        />

    )
}

export default FastCheckbox