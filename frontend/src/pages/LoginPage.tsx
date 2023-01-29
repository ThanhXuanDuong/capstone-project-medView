import {Alert, AlertTitle, Box, Button, FormControl, TextField, Typography} from "@mui/material";
import {ChangeEvent, FormEvent, useCallback, useMemo, useState} from "react";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";

export default function LoginPage(){

    const [credentials,setCredentials] = useState({"username":"","password":""});

    const handleChange =useCallback((event:ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = event.target;
        setCredentials({...credentials, [name]:value})
    }, [credentials]
    );

    const [searchParams] = useSearchParams();
    const redirect = useMemo(
        () => searchParams.get("redirect") || "/",
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
            <div className={"login-container"}>
                <Box  sx={{ display: 'flex', mt: 15}}
                      justifyContent={"center"}
                      alignItems={"center"}>
                    <form onSubmit={onSubmit}>
                        <FormControl >
                            <Typography variant="h3"
                                        align={"center"}
                                        sx={{ mb: 2 }}
                            >Login</Typography>

                            <TextField
                                sx={{ width: 350, mb: 2 }}
                                id="username"
                                label={"Username"}
                                name="username"
                                value={credentials.username}
                                variant="outlined"
                                onChange={handleChange}
                            />

                            <TextField
                                sx={{ width: 350, mb: 2 }}
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

                            <Button type="submit"
                                variant="contained"
                            >Login</Button>

                        </FormControl>
                    </form>
                </Box>
            </div>
    );
}