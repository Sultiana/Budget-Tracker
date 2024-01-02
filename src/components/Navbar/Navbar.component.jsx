import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import Login from "../../containers/Login/Login.container";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";
const Navbar = () => {
    const { user } = useContext(UserContext);
    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.navbar_item}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/2746/2746064.png"
                        alt="wallet"
                    />
                    <Link to="homepage" className={styles.home}>
                        MyWallet
                    </Link>
                    <Link to="addTransaction" className={styles.transaction}>
                        Transactions
                    </Link>
                    <Link to="budgeting" className={styles.budgeting}>
                        Budgeting
                    </Link>
                </div>

                <div className={styles.navbar_item}>
                    {!user.isLoggedIn ? (
                        <Link to="/" className={styles.logIn}>
                            Login
                        </Link>
                    ) : (
                        <Link
                            onClick={() => {
                                setUser({
                                    username: "Guest",
                                    isLoggedIn: false,
                                    token: "",
                                });
                                localStorage.removeItem("user");
                            }}
                            className={styles.logOut}
                        >
                            LogOut
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
