import { Button, FormControl, Grid, TextField} from "@mui/material";

export default function LoginPage(){
    return(
            <div className={"login-container"}>
                <Grid container sx={{ mt: 15}} justifyContent={"center"} alignItems={"center"}>
                    <FormControl>
                        <Grid container justifyContent={"center"}>
                            <h1>Login</h1>
                        </Grid>
                        <TextField  sx={{ mb: 2 }} id="username" label="Username" variant="outlined" />
                        <TextField  sx={{ mb: 2 }} id="password" label="Password" variant="outlined" />
                        <Button variant="contained">Login</Button>
                    </FormControl>
                </Grid>
            </div>
    );
}