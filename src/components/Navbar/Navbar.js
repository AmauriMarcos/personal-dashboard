import React from "react";
import styles from "./Navbar.module.css";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li>
          <Link to="/signUp">SignIn</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
