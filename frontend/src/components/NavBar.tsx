import {AppBar, Box, CardMedia, IconButton, Toolbar, Typography} from "@mui/material";
import Logout from "./login/Logout";
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";
import logo from "../logo.png";
import React from "react";

export default function NavBar ({
    showIcons
 }:{
    showIcons: boolean
}
    ){

    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        sx={{py:0}}
                        size="large"
                        edge="start"
                        color= "inherit"
                        aria-label="menu"
                        onClick={() => navigate("/")}
                    >
                        <CardMedia
                            sx={{width:"60px", objectFit:'scale-down'}}
                            component="img"
                            image={logo}
                        />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    </Typography>

                    { showIcons &&
                        <Box sx={{display:'flex', justifyContent:'flex-end', gap:'1rem'}}>
                            <IconButton color="inherit" onClick={() => navigate("/patients")}>
                                <HomeIcon fontSize={"large"}/>
                            </IconButton>
                            <Logout/>
                        </Box>
                    }
                </Toolbar>
            </AppBar>
        </Box>


    );

}