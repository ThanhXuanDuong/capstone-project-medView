import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NotFoundPage() {
    const {user,isReady} = useAuth();

    const navigate =useNavigate();

    return (
        <Box  sx={{ display: 'flex', mt: 15}}
              flexDirection={"column"}
              gap={2}
              justifyContent={"center"}
              alignItems={"center"}>

            <Typography variant="h1" >
                404
            </Typography>

            <Typography variant="h5" >
                Page not found
            </Typography>

            {(user && isReady)
                ? <Button variant="contained"
                          onClick={() => navigate("/patients")}
                >Back Home</Button>

                : <Button variant="contained"
                          onClick={() => navigate("/login")}
                >Go to Login</Button>
            }
        </Box>
    );
}