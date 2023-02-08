import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode:'dark',
        background:{
            default: '#343a40'
        },
        primary: {
            main: '#FFCE44',
            contrastText:'#000000'
        }
    },
});

export default theme;