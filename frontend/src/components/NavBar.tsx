import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import Logout from "./Logout";

export default function NavBar ({
    isLoggedIn
 }:{
    isLoggedIn: boolean
}

    ){
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

                        {isLoggedIn && <Logout/>}

                    </Toolbar>
                </AppBar>
            </Box>
        </>

    );

}