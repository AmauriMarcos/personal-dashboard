import React from "react";
import styles from "./GoalOverview.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDash } from "../../Context/DashContext";

const GoalOverview = () => {
  const { amount, goalTitle, goal, saving } = useDash();
  let value;
  let progress;
  
  if (goal == 0) {
    progress = 0
  } else {
    value = (saving / goal) * 100;
    progress = value.toFixed(2);
  }

  return (
    <div className={styles.GoalOverview}>
      <div className={styles.wrapperTitleAndStatusGoal}>
        <p className={styles.goalTitle}>{goalTitle}</p>
        <h2 className={styles.goalStatus}>Completed</h2>
      </div>
      <div className={styles.circle}>
        <CircularProgressbar value={progress} text={`${progress}%`} />
      </div>
    </div>
  );
};

export default GoalOverview;