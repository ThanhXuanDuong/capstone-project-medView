import {useCallback} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

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
        <Button color="inherit" onClick={logout}>Logout</Button>
    )
}