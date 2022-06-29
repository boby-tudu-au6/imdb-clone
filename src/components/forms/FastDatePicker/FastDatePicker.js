import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useController } from "react-hook-form";
import { getOr } from "utils/handlers";

export default function BasicDatePicker({
  label,
  name,
  control,
  ...rest
}) {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields, errors },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={field.value}
        {...rest}
        onChange={(value) => field.onChange(value)}
        inputProps={{ readOnly: true }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              error={Boolean(getOr(errors, name, false))}
              helperText={getOr(errors, `${name}.message`, "")} />
          )
        }}
      />
    </LocalizationProvider>
  );
}
