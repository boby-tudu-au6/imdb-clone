import React from 'react';
import { Grid } from '@mui/material';
import FastSelect from 'components/forms/FastSelect';
import FastTextField from 'components/forms/FastTextField';
import FastPasswordField from '../FastPasswordField';
import FastAutoComplete from 'components/forms/FastAutocomplete'
import FastDatePicker from '../FastDatePicker';

function FormGenerator({ control, rootProps = {}, child = [] }) {
    const getComponent = (item) => {
        delete item.gridProps
        switch (item.type) {
            case 'select':
                return <FastSelect {...item} control={control} />
            case "auto-complete":
                return <FastAutoComplete {...item} control={control} />
            case "password":
                return <FastPasswordField {...item} control={control} />
            default:
                return <FastTextField {...item} control={control} />
            case "date":
                return <FastDatePicker
                    {...item}
                    control={control}
                />
            // case "phone":
            //     return <PhoneInput
            //         {...item}
            //         control={control}
            //     />
            // case "label":
            //     return <Typography {...item} >{item.value}</Typography>
        }
    }
    return (
        <Grid container {...rootProps}>
            {child.map((item, i) => (
                <Grid key={i} item xs={item?.gridProps?.xs || 6} {...item.gridProps}>
                    {getComponent(item)}
                </Grid>
            ))}
        </Grid>
    )
}

export default FormGenerator