import NavBar from "../components/NavBar";
import {Box, Button, CardMedia, ThemeProvider, Typography} from "@mui/material";
import React from "react";
import theme from "../components/styling/theme";
import {useNavigate} from "react-router-dom";

export default function HomePage(){

    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            <NavBar isLoggedIn={false}/>

            <Box sx={{display:"flex",
                justifyContent:"center" ,
                alignItems:"center",
                width: "100%",
                height: "calc(100vh - 64px)",
                overflow:"hidden"
            }}>
                <CardMedia
                    sx={{height:"100%",
                        p:"5%",
                        backgroundColor:"black",
                        opacity: "0.1",
                        objectFit:'contain',
                        overflow:"hidden"
                    }}
                    component="img"
                    image={"https://post.healthline.com/wp-content/uploads/2022/01/CT-scan-of-the-abdomen-and-pelvis-body4.jpg"}
                />
                <Box sx={{position:"absolute",
                    height:"calc(100vh - 64px)",
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center",
                    gap: "1rem",
                    overflow:"hidden"
                }}>
                    <Box sx={{display:"flex"}}>
                        <Typography variant="h1" color="white" >
                            med
                        </Typography>
                        <Typography variant="h1" color="primary.main">
                            View
                        </Typography>
                    </Box>
                    <Typography variant="h3" color="white" >
                        Management. Viewer. Tools.
                    </Typography>
                    <Button variant={"contained"} onClick={() => navigate("/login")}>Login</Button>
                </Box>
            </Box>
        </ThemeProvider>
    )
}