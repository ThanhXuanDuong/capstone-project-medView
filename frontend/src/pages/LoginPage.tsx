import {
    Alert,
    AlertTitle, Avatar,
    Box,
    Button,
    Container,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, {ChangeEvent, FormEvent, useCallback, useMemo, useState} from "react";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import theme from "../components/styling/theme";
import NavBar from "../components/styling/NavBar";

export default function LoginPage(){
    const [credentials,setCredentials] = useState({"username":"","password":""});

    const handleChange =useCallback((event:ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = event.target;
        setCredentials({...credentials, [name]:value})
    }, [credentials]
    );

    const [searchParams] = useSearchParams();
    const redirect = useMemo(
        () => searchParams.get("redirect") || "/patients",
        [searchParams]
    );
    const navigate = useNavigate();

    const [error, setError] = useState<string>("");

    const onSubmit = useCallback(async(event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        setError("");

        try {
            await axios.post("/api/app-users/login", null, {
                headers:
                    {
                        "Authorization": "Basic " + window.btoa(`${credentials.username}:${credentials.password}`)
                    }
            });
            navigate(redirect);
        }catch (e) {
            setError("Invalid username oder password");
        }
    }, [credentials, navigate, redirect]
    );

    return(

        <ThemeProvider theme={theme}>
            <NavBar showIcons={false}/>
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        marginTop: 25,
                        padding:5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius:5,
                        backgroundColor:'#272727'
                    }}
                >
                    <Avatar sx={{ m: 1, backgroundColor: 'primary.main'}}>
                        <LockOutlinedIcon sx={{color: '#000000'}}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>

                    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            sx={{
                                input: {
                                    color: "white",
                                    background: "#343a40"
                                }
                            }}
                            margin="normal"
                            fullWidth
                            id="username"
                            label={"Username"}
                            name="username"
                            value={credentials.username}
                            variant="outlined"
                            onChange={handleChange}
                        />

                        <TextField
                            sx={{
                                input: {
                                    color: "white",
                                    background: "#343a40"
                                },
                                boxShadow:'none'
                            }}
                            margin="normal"
                            fullWidth
                            id="password"
                            label={"Password"}
                            name="password"
                            value={credentials.password}
                            variant="outlined"
                            type={"password"}
                            onChange={handleChange}
                        />

                        {error &&
                            <Alert severity="error" sx={{mb: 2}}>
                                <AlertTitle>Error</AlertTitle>
                                Invalid username or password
                            </Alert>
                        }

                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                        >Login</Button>
                     </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}