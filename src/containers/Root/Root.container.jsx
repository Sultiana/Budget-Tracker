import React, { useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import Navbar from "../../components/Navbar/Navbar.component";
import { Outlet } from "react-router-dom";

const Root = () => {
    const [user, setUser] = useState({
        username: "Guest",
        isLoggedIn: false,
        token: null,
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
        </UserContext.Provider>
    );
};

export default Root;
