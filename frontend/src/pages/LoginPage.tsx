import { Button, FormControl, Grid, TextField} from "@mui/material";
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

    const onSubmit = useCallback(async(event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        try {
            await axios.post("/api/app-users/login", null, {
                headers:
                    {
                        "Authorization": "Basic " + window.btoa(`${credentials.username}:${credentials.password}`)
                    }
            });
            navigate(redirect);
        }catch (e) {
           console.log(e);
        }
    }, [credentials, navigate, redirect]
    );

    return(
            <div className={"login-container"}>
                <Grid container sx={{ mt: 15}} justifyContent={"center"} alignItems={"center"}>
                    <form onSubmit={onSubmit}>
                        <FormControl >
                            <Grid container justifyContent={"center"}>
                                <h1>Login</h1>
                            </Grid>

                            <TextField
                                sx={{ mb: 2 }}
                                id="username"
                                label={"Username"}
                                name="username"
                                value={credentials.username}
                                variant="outlined"
                                onChange={handleChange}
                            />

                            <TextField
                                sx={{ mb: 2 }}
                                id="password"
                                label={"Password"}
                                name="password"
                                value={credentials.password}
                                variant="outlined"
                                type={"password"}
                                onChange={handleChange}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                            >Login</Button>

                        </FormControl>
                    </form>
                </Grid>
            </div>
    );
}