import {Route, Routes, useSearchParams} from "react-router-dom";
import DashboardPage from "./DashboardPage";
import LoginPage from "./LoginPage";
import Auth from "../components/login/Auth";
import DetailPage from "./DetailPage";
import React, {useMemo} from "react";
import NoAuth from "../components/login/NoAuth";
import NavBar from "../components/NavBar";
import NotFoundPage from "./NotFoundPage";

export default function Root() {
    const [searchParams] = useSearchParams();
    const redirect = useMemo(
        () => searchParams.get("redirect") || "/",
        [searchParams]
    );

    return (
        <>
            <NavBar isLoggedIn={true}/>
                <Routes>
                    <Route path={"/"} element={
                        <Auth>
                            <DashboardPage />
                        </Auth>
                    }/>

                    <Route path={"/login"} element={
                        <NoAuth redirect={redirect}>
                            <LoginPage/>
                        </NoAuth>}
                    />

                    <Route path={"/patients/:id"} element={
                        <Auth>
                            <DetailPage/>
                        </Auth>}
                    />

                     <Route path={"*"} element={<NotFoundPage/>}/>

                </Routes>
        </>
    );
}
