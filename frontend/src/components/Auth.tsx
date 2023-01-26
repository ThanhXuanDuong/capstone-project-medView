import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Auth(
    {
    children
    }: {
    children: React.ReactNode
    }) {
    const {user,isReady} = useAuth();

    const location = useLocation();

    const encodedURI=encodeURIComponent(location.pathname + location.search);

    return (
        <>
            { !isReady
                ? null
                : (user
                    ? <div>{children}</div>
                    : (
                        <Navigate to={`/login?redirect=${encodedURI}`}/>
                    )
                )
            }
        </>
    )
}