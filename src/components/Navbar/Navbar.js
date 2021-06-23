import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { bubble as Menu } from "react-burger-menu";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
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
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li >
              <Link style={{color: "#D46F5E"}} to="/signUp">Sign In</Link>
            </li>
          </ul>
        </Menu>
      )}

      <ul className={styles.list}>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li className={styles.signInButton}>
          <Link to="/signUp">Sign In</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
