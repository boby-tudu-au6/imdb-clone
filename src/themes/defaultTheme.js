import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightSemiBold: 600,
        fontWeightBold: 700,
        fontSize: 11,
    },
    palette: {
        primary: {
            main: '#000000',
            secondary: '#000000',
            contrastText: '#ffffff'
        }
    },
    components: {
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
                variant: 'outlined',
                margin: 'normal',
                size:'default'
            }
        },
        MuiButton: {
            defaultProps: {
                variant: "contained",
                color: "primary",
                size:'large',
                margin:'normal'
            }
        }
    }
});

export default theme