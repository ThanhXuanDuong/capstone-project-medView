import {Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import Auth from "./components/Auth";
import DetailPage from "./pages/DetailPage";
import React from "react";

export default function Root() {
    return (
        <Routes>
            <Route path={"/"} element={
                <DashboardPage/>
            }/>
            <Route path={"/login"} element={<LoginPage/>}/>
            <Route path={"/patients/:id"} element={
                <Auth >
                    <DetailPage/>
                </Auth>}/>

        </Routes>
    );
}
