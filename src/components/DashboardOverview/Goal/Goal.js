import React from 'react';
import styles from './Goal.module.css'

const Goal = () => {
    return(
        <div className={styles.Goal}>
            <div className={styles.wrapperTitleAndStatusGoal}>
                <p className={styles.goalTitle}>Plan for 2021</p>
                <h2 className={styles.goalStatus}>Completed</h2>
            </div>
            <div className={styles.circle}>
                 <p className={styles.goalAchievement}>100%</p>
            </div>
        </div>
    )
}

export default Goal;