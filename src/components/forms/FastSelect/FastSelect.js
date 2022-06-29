import { useForm, useController, Controller } from "react-hook-form";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  selectClasses,
  outlinedInputClasses,
  inputBaseClasses,
  InputBase,
  OutlinedInput,
  formControlClasses,
  formLabelClasses,
  inputLabelClasses,
  TextField,
  Typography,
  styled
} from "@mui/material";
// import { alpha, styled } from "@mui/material/styles";
import { getOr } from "utils/handlers";

// import { Select, InputLabel, FormControl, MenuItem } from "@material-ui/core";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-inputMarginDense': {
    paddingTop: 10,
    paddingBottom: 10
  }
  // [`& .${formLabelClasses.root}.${inputLabelClasses.root}.${inputBaseClasses.focused}`]: {
    // color: "#05006D",
    // color: theme.palette.primary.main,
  // },
  // [`& .${inputBaseClasses.root}.${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
  // {
    // borderColor: "#05006D",
  // },
  // "& .MuiInputLabel-root": {
  //   fontSize: "0.785714rem",
  // },
}));

const FastSelect = ({
  control,
  defaultValue = "",
  name,
  options = [],
  label,
  disabled = false,
  emptyField = false,
  variant = "outlined",
  ...rest
}) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields, errors },
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  return (
    <StyledFormControl fullWidth>
      {/* <InputLabel>{label}</InputLabel> */}
      <TextField
        variant={variant}
        select
        disabled={disabled}
        value={field.value}
        label={label}
        // fullWidth
        // InputLabelProps={{
        //   style: { fontSize: "0.785714rem" },
        // }}
        onChange={(event) => {
          if (rest.onChange) rest.onChange(event.target.value);
          if (!rest.onChange) field.onChange(event.target.value);
        }}
        error={Boolean(getOr(errors, name, false))}
        helperText={getOr(errors, `${name}.message`, "")}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                // width: 250,
              },
            },
          },
        }}
        {...rest}
      >
        {emptyField && (
          <MenuItem value="">
            <Typography style={{ color: "transparent" }}>__</Typography>
          </MenuItem>
        )}
        {options.map(({ label, value }, idx) => (
          <MenuItem value={value} key={idx}>
            <Typography variant="subtitle2" color="inherit">
              {label}
            </Typography>
          </MenuItem>
        ))}
      </TextField>
    </StyledFormControl>
  );
};

export const CustomSelectRegister = (props) => {
  return (
    <StyledFormControl fullWidth>
      {/* <InputLabel>{label}</InputLabel> */}
      <TextField variant="outlined" select {...props} label={props.label} fullWidth size="small">
        {props.emptyField && (
          <MenuItem value="">
            <Typography sx={{ color: "transparent" }}>__</Typography>
          </MenuItem>
        )}
        {props.options.map(({ label, value }, idx) => (
          <MenuItem value={value} key={idx}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </StyledFormControl>
  );
};
export const CustomSelect = (props) => {
  const { name, control, options = [], multiple = true, label, ...rest } = props;
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <StyledFormControl fullWidth size="small">
            <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple={multiple}
              value={value}
              onChange={e => onChange(e.target.value)}
              input={<OutlinedInput label={label} />}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  },
                },
              }}
            >
              <MenuItem value='all' disabled={value.filter(item => item !== '').join(',') !== 'all' && value.join(',') !== ''}>All</MenuItem>
              {options.map((item) => (
                <MenuItem
                  key={item.value}
                  value={item.value}
                  disabled={value.filter(item => item !== '').join(',') === 'all'}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl >
        );
      }}
    />
  );
};

export default FastSelect;
