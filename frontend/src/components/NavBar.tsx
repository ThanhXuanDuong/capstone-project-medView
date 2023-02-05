import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import Logout from "./login/Logout";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";

export default function NavBar ({
    isLoggedIn
 }:{
    isLoggedIn: boolean
}
    ){

    const navigate = useNavigate();
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Typography variant="h6"
                                    component="div"
                                    sx={{ flexGrow: 1 }}>
                            Logo
                        </Typography>

                        <Box sx={{display:'flex', justifyContent:'center', gap:'1rem'}}>
                            <IconButton color="inherit" onClick={() => navigate("/")}>
                                <HomeIcon/>
                            </IconButton>
                            {isLoggedIn && <Logout/>}
                        </Box>

                    </Toolbar>
                </AppBar>
            </Box>
        </>

    );

}