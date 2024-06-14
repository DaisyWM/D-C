import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

export default function Layout() {
    return (
        <div className="py-4 px-8 flex flex-col min-h-screen">
            <Toaster />
            <Header />
            <Outlet />
        </div>
    )
}