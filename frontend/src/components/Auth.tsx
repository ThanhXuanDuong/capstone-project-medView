import React, {useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import axios from "axios";

export default function Auth({
    children
}: {
    children: React.ReactNode
}) {

    const [user, setUser] = useState({username: "username"});
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        try {
            (async () => {
                const res = await axios.get("/api/app-users/me");
                setUser(res.data);
            })();
        } catch (e) {
            alert("You are not logged in");
        } finally {
            setIsReady(true);
        }
    }, []);


    const location = useLocation();
    return (
        <>  !isReady
            ? null
            : (user ?
                <div>{children}</div>
                :
                <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}/>
            )
        </>
    )
}