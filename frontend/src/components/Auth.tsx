import React from "react";
import {Navigate, useLocation} from "react-router-dom";

export default function Auth({
    children,
    isAuthenticated
}: {
    children: React.ReactNode,
    isAuthenticated: boolean
}) {

    const location = useLocation();
    return (
        <div>
            !isAuthenticated
                ?
                <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}/>
                :
                <div>{children}</div>
        </div>
    )
}