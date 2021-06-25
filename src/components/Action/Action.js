import React from 'react';
import styles from './Action.module.css';
import {Link} from "react-router-dom";

const Action = () =>{
    return(
        <div className={styles.Action}>
            <div className={styles.content}>
                <h1>Save for future Goals</h1>
                <Link to="/login" className={styles.wrapperButton}>
                    <button>Get Started</button>
                </Link>
            </div>
            
        </div>
    )
}

export default Action;