import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import React from "react";

const Layout = () => {
  return (
    <main className="App">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;
