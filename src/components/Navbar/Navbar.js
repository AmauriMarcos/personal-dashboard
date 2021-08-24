import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useHistory } from "react-router-dom";
import Hamburger from "hamburger-react";
import { bubble as Menu } from "react-burger-menu";
import { useAuth } from "../Context/AuthContext";
import Scroll from "react-scroll";
const ScrollLink = Scroll.Link;

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      alert("Failed to logout");
    }
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <a href="#">DashFamily</a>
      </div>
      <div className={styles.blocBurger}>
        <Hamburger color="#D46F5E" rounded toggled={isOpen} toggle={setOpen} />
      </div>

      {isOpen && (
        <Menu className={styles.blocNav} isOpen>
          <ul className={styles.listMobile}>
            {currentUser && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
            <li>
              <a href="#">Product</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            {currentUser ? (
              <li onClick={handleLogout}>
                <a style={{ color: "#D46F5E" }} href="#">
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <Link style={{ color: "#D46F5E" }} to="/signUp">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </Menu>
      )}

      <ul className={styles.list}>
        {currentUser && (
          <li>
            <Link to="/dashboard">Dasboard</Link>
          </li>
        )}
        <li>
        <ScrollLink
          to="product-section"
          spy={true}
          smooth={true}
          duration={500}
          className="some-class"
          activeClass="some-active-class"
        >
       
          Product
        </ScrollLink>
        </li>
        <li>
        <ScrollLink
          to="features-section"
          spy={true}
          smooth={true}
          duration={500}
          className="some-class"
          activeClass="active"
        >
          Features
        </ScrollLink>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        {currentUser ? (
          <li onClick={handleLogout} className={styles.logoutButton}>
            <a href="#">Logout</a>
          </li>
        ) : (
          <li className={styles.signInButton}>
            <Link to="/signUp">Sign In</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
