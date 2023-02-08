import {Route, Routes, useSearchParams} from "react-router-dom";
import DashboardPage from "./DashboardPage";
import LoginPage from "./LoginPage";
import Auth from "../components/login/Auth";
import DetailPage from "./DetailPage";
import React, {useMemo} from "react";
import NoAuth from "../components/login/NoAuth";
import NotFoundPage from "./NotFoundPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../components/styling/theme";
import HomePage from "./HomePage";

export default function Root() {
    const [searchParams] = useSearchParams();
    const redirect = useMemo(
        () => searchParams.get("redirect") || "/",
        [searchParams]
    );

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Routes>
                    <Route path={"/homepage"} element={
                            <HomePage />
                    }/>

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
            </ThemeProvider>
        </>
    );
}
