import {AppBar, Box, CardMedia, IconButton, Toolbar, Typography} from "@mui/material";
import Logout from "./login/Logout";
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";
import logo from "../logo.png";

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
                            color= "inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => navigate("/homepage")}
                        >
                            <CardMedia
                                sx={{width:"60px", objectFit:'scale-down'}}
                                component="img"
                                image={logo}
                            />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        </Typography>

                        { isLoggedIn &&
                            <Box sx={{display:'flex', justifyContent:'flex-end', gap:'1rem'}}>
                                <IconButton color="inherit" onClick={() => navigate("/")}>
                                    <HomeIcon/>
                                </IconButton>
                                <Logout/>
                            </Box>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </>

    );

}