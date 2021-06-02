import React from 'react';
import styles from './Brands.module.css';
import googleBrand from '../../assets/googleBrand.svg';
import reactBrand from '../../assets/reactBrand.svg';
import mysqlBrand from '../../assets/mysqlBrand.svg';
import nodeBrand from '../../assets/nodeBrand.svg';
import netlifyBrand from '../../assets/netlifyBrand.svg';
import materialuiBrand from '../../assets/materialuiBrand.svg';

const Brands = () =>{
    return(
        <ul className={styles.brandList}>
            <li>
                <img className={styles.google} src={googleBrand} />
            </li>
            <li>
                <img className={styles.mysql} src={mysqlBrand} />
            </li>
            <li>
                <img className={styles.react} src={reactBrand} />
            </li>
            <li>
                <img className={styles.node} src={nodeBrand } />
            </li>
            <li>
                <img className={styles.netlify} src={netlifyBrand} />
            </li>
            <li>
                <img className={styles.material} src={materialuiBrand} />
            </li>
        </ul>
    )
}

export default Brands;