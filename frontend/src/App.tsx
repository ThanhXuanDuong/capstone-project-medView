import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<DashboardPage/>}/>
          <Route path={"/login"} element={<LoginPage/>}/>
          <Route path={"/patients/:id"} element={<DetailPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
