import React, {useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import axios from "axios";

export default function Auth({
    children
}: {
    children: React.ReactNode
}) {

    const [user, setUser] = useState<{username: string}|null>(null)
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/api/app-users/me");
                setUser(res.data);
                console.log(res.data);
            } catch (e) {
                console.error("You are not logged in", e);
            } finally {
                setIsReady(true);
            }
        })();
    }, []);
    console.log(user);
    console.log(isReady);

    const location = useLocation();
    return (
        <div>  !isReady
            ? null
            : (user ?
                <div>{children}</div>
                :
                <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}/>
            )
        </div>
    )
}