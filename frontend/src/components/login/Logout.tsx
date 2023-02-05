import {useCallback} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {IconButton} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Logout() {
    const navigate = useNavigate();
    const location = useLocation();

    const logout= useCallback(async () => {
        await axios.get("/api/app-users/logout");
        navigate("/login?redirect=" + encodeURIComponent(location.pathname + location.search));
        window.document.cookie = "";
        window.localStorage.clear();
    }, [location, navigate]);

    return (
        <IconButton color="inherit" onClick={logout}>
            <LogoutIcon/>
        </IconButton>
    )
}