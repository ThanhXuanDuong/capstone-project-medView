import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode:'dark',
        background:{
            default: '#4c4c47'//'#46494c''#4c4c47'
        },
        primary: {
            main: '#FFCE44',
            dark:'#ffa700',
            light:'#feffa3',
            contrastText:'#000000'
        },
        secondary: {
            main: '#F5F5F5',
            contrastText:'#000000'
        }
    },
});

export default theme;