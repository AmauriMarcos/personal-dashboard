import React from 'react';
import styles from './Action.module.css';

const Action = () =>{
    return(
        <div className={styles.Action}>
            <div className={styles.content}>
                <h1>Save for future Goals</h1>
                <button>Get Started</button>
            </div>
            
        </div>
    )
}

export default Action;