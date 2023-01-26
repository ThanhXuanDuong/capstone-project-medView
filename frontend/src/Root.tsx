import {Route, Routes, useSearchParams} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import Auth from "./components/Auth";
import DetailPage from "./pages/DetailPage";
import React, {useMemo} from "react";
import NoAuth from "./components/NoAuth";
import NavBar from "./components/NavBar";

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
                            <DashboardPage/>
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

            </Routes>
        </>
    );
}
