import React from "react";
import Navbar from "./Navbar";

// Layout.js
const Layout = ({ children }) => {
    return (
        <div>
            <nav>
                <a href="/">Home</a>
                <a href="/memories">Memories</a>
            </nav>
            {children}
        </div>
    );
};
export default Layout;

