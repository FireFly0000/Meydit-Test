import React from "react";
import { Route, Routes} from "react-router-dom";
import Home from "./views/homepage";
import CustomerPage from "./views/customerHomePage";
import MakerPage from "./views/makerHomePage";
import Auth from "./views/AuthPage";
import RegProfile from "./views/RegProfilePage";
import CustomerJobsPage from "./views/CustomerjobsPage";
import ViewJob from "./views/viewJob";
import MakerViewJob from "./views/makerViewJob";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route element={<CustomerPage/>} path="/customer"/>
      <Route element={<MakerPage/>} path="/maker"/>
      <Route element={<Auth/>} path="/"/>
      <Route element={<RegProfile/>} path="/reg_profile" />
      <Route element={<CustomerJobsPage/>} path="/customer_job" />
      <Route element={<ViewJob/>} path="/view_job" />
      <Route element={<MakerViewJob/>} path="/maker_view_job" />
    </Routes>
  );
}

export default App;
