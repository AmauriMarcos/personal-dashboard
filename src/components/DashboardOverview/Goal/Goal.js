import React from "react";
import styles from "./Goal.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDash } from "../../Context/DashContext";
import { Switch } from "@material-ui/core";

const Goal = ({ title, goalAmount }) => {
  const { amount, goalTitle, goal, saving } = useDash();
  let value;
  let progress;

  if (saving == 0) {
    progress = 0;
  } else {
    value = (saving / goalAmount) * 100;
    progress = value.toFixed(2);
  }

  console.log(progress);

  return (
    <div className={styles.Goal}>
      <div className={styles.wrapperTitleAndStatusGoal}>
        <p className={styles.goalTitle}>{title}</p>
        <h2 className={styles.goalStatus}>Completed</h2>
        <p className={styles.goalAmount}>$ {goalAmount}</p>
      </div>
      <div className={styles.circle}>
        {progress >= 100 ? (
          <CircularProgressbar
            styles={buildStyles({
              pathColor: `#2BC4A9`,
              textColor: "#2BC4A9",
              trailColor: "#2BC4A9",
              backgroundColor: "#2BC4A9",
            })}
            value="100"
            text={`100%`}
          />
        ) : (
          <CircularProgressbar value={progress} text={`${progress}%`} />
        )}
      </div>
    </div>
  );
};

export default Goal;
