import React, { useState } from 'react'
import { useController } from 'react-hook-form'
import { TextField } from '@mui/material'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const AutoCompleteHook = (props) => {
  const {
    className,
    options,
    label,
    variant,
    endAdornment,
    name,
    loading,
    freeSolo = false,
    disableClearable = false,
    control,
    extraComponent: ExtraComponent,
    ...rest
  } = props;

  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
  });

  const [open, setOpen] = useState(false);
  const [componentData, setComponentData] = useState({})
  const toggleOpen = () => setOpen(!open)

  const filter = createFilterOptions();

  const filterOptions = (options, params) => {
    const filtered = filter(options, params);

    const { inputValue } = params;

    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option.label);
    if (inputValue !== '' && !isExisting) {
      filtered.push({
        inputValue,
        label: `Add "${inputValue}"`,
      });
    }

    return filtered;
  }

  const onChange = (event, newValue) => {
    console.log({ newValue, type: typeof newValue });
    const lastValue = newValue[newValue.length - 1]
    if (typeof newValue === 'string') {
      // setValue({
      //   title: newValue,
      // });

      field.onChange(newValue)
    } else if (lastValue && lastValue.inputValue) {
      // Create a new value from the user input
      // setValue({
      //   title: newValue.inputValue,
      // });

      // field.onChange({ value: "", label: newValue.inputValue })
      toggleOpen()
      setComponentData(newValue)
      // newValue[newValue.length - 1] = { value: "", label: lastValue.inputValue }
      // field.onChange(newValue);
    } else {

      field.onChange(newValue);
    }
  }

  return (
    <>
      <ExtraComponent open={open} onChange={field.onChange} data={componentData} onClose={() => setOpen(false)} />
      <Autocomplete
        value={field.value}
        onChange={onChange}
        className={className}
        getOptionLabel={(option) => option.label || ""}
        disableClearable={disableClearable}
        loading={loading}
        freeSolo={freeSolo}
        filterOptions={filterOptions}
        {...rest}
        options={options ? options : []}
        renderInput={(params) => {
          delete params.InputProps?.className;
          return (
            <TextField
              {...params}
              label={label}
              fullWidth
              InputProps={{
                ...params.InputProps
              }}
            />
          );
        }}
      />
    </>
  );
};

export default AutoCompleteHook