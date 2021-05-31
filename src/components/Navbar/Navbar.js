import React, {useState} from "react";
import styles from "./Navbar.module.css";
import {Link} from "react-router-dom";
import Hamburger from 'hamburger-react'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <a href="#">Logo</a>
      </div>
      <div className={styles.blocBurger}>
          <Hamburger rounded toggled={isOpen} toggle={setOpen} />
      </div>
     
      {isOpen &&<div className={styles.blocNav}>
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">SignIn</a>
            </li>
          </ul>
      </div>}
      <ul className={styles.list}>
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
