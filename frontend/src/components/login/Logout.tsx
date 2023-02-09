import {useCallback} from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import {IconButton} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Logout() {
    const navigate = useNavigate();

    const logout= useCallback(async () => {
        try{
            await axios.get("/api/app-users/logout");
        }catch(e:any){
            console.log(e.response.message);
        }finally {
            navigate("/");
            window.document.cookie = "";
            window.localStorage.clear();
        }
    }, [navigate]);

    return (
        <IconButton color="inherit" onClick={logout}>
            <LogoutIcon/>
        </IconButton>
    )
}