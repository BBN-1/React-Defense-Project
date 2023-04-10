import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../contexts/authContext";
import Search from "../Search/Search";

import styles from "./Header.module.css";
import main_logo_transparent from "../../images/logo_header.png";

const Header = () => {
    const { user } = useContext(authContext);

    const setHeaderLinks = ({ isActive }) => {
        return isActive ? styles["active-link"] : styles["non-active-link"];
    };

    return (
        <header className={styles["header-box"]}>
            <nav className={styles["main-nav"]}>
                <div className={styles["logo-box"]}>
                    <li className={styles["logo-link"]}>
                        <NavLink to="/">
                            <img src={main_logo_transparent} alt="main logo" />
                        </NavLink>
                    </li>
                </div>
                <ol role="list" className={styles["main-links-box"]}>
                    <li>
                        <NavLink to="/catalog" className={setHeaderLinks}>
                            GET MOTIVATED!
                        </NavLink>
                    </li>

                    {user.accessToken ? (
                        <>
                            <li>
                                <NavLink
                                    to="/create"
                                    className={setHeaderLinks}
                                >
                                    CREATE
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/profile"
                                    className={setHeaderLinks}
                                >
                                    Welcome,{" "}
                                    {user.username?.toUpperCase() ||
                                        "DEFAULT USER"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/logout"
                                    className={setHeaderLinks}
                                >
                                    LOGOUT
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login" className={setHeaderLinks}>
                                    LOGIN
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/register"
                                    className={setHeaderLinks}
                                >
                                    REGISTER
                                </NavLink>
                            </li>
                        </>
                    )}

                    <li className={styles["header-searchBtn"]}>
                        <Search />
                    </li>
                </ol>
            </nav>
        </header>
    );
};

export default Header;
