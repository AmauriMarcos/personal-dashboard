import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import styles from "./Home.module.css";
import Brands from "../../components/Brands/Brands";
import Product from '../../components/Product/Product';
import Features from '../../components/Features/Features';
import Action from '../../components/Action/Action';

const Home = ({ children }) => {
  return (
    <div className={styles.Home}>
      <header className={styles.header}>
        <Navbar />
        <Hero />
      </header>
      <main>
        <Brands/>
        <Product/>
        <Features/>
        <Action/>
      </main>
      <footer className={styles.footer}>
          <p><span>&copy;</span>Copyrights Amauri Santos 2021</p>
      </footer>
    </div>
  );
};

export default Home;
