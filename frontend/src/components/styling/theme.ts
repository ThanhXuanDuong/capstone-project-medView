import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode:'dark',
        background:{
            default: '#343a40'
        },
        primary: {
            main: '#F7D104',
            contrastText:'#ffffff'
        }
    },
});

export default theme;