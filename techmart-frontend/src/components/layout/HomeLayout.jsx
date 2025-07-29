import React from "react";
import { Outlet } from "react-router-dom";
import HeaderHome from "../HomeHeader";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="text-black">
        <Header/>
      </header>

      <main className="flex-1 p-4 overflow-auto bg-background">
        <Outlet />
      </main>

      <footer className="py-4 bg-orange-500 text-center text-white bg-primary">
        <Footer />
      </footer>
    </div>
  );
}
