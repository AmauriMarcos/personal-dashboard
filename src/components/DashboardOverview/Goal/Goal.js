import React from 'react';
import styles from './Goal.module.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useDash} from '../../Context/DashContext';

const Goal = () => {
    
    const {amount} = useDash();
    const value = (amount / 1500) * 100;
    let progress = value.toFixed(2);

    return(
        <div className={styles.Goal}>
            <div className={styles.wrapperTitleAndStatusGoal}>
                <p className={styles.goalTitle}>Plan for 2021</p>
                <h2 className={styles.goalStatus}>Completed</h2>
            </div>
            <div className={styles.circle}>
                 <CircularProgressbar value={progress } text={`${progress}%`}/>
            </div>
        </div>
    )
}

export default Goal;