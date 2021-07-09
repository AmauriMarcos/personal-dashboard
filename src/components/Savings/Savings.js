import React, { useState } from "react";
import styles from "./Savings.module.css";
import { Button } from "@material-ui/core";
import { useStyles } from "../../StylesMaterialUi/StylesMaterialUi";
import { useDash } from "../Context/DashContext";
import saveIcon from "../../assets/saveIcon.svg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ReactPaginate from "react-paginate";
import Goal from "../../components/DashboardOverview/Goal/Goal";
import { useMediaQuery } from "react-responsive";

const Savings = () => {
  const classes = useStyles();
  const { amount, goalTitle, goal, allGoals, openSavingModal, saving } =
    useDash();
  const isMobile = useMediaQuery({ query: `(max-width: 419px)` });
  let value;
  let progress;

  if (saving == 0) {
    progress = 0;
  } else {
    value = (saving / goal) * 100;
    progress = value.toFixed(2);
  }

  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 6;
  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(allGoals.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  console.log(allGoals)

  return (
    <div className={styles.Savings}>
      <div className={styles.SavingsAmount}>
        <div className={styles.boxAmount}>
          <h3 className={styles.title}>Saved for the future</h3>
          <h1 className={styles.amount}>
            <span className={styles.cifrao}>$</span>
            {saving}
          </h1>
          <Button
            onClick={openSavingModal}
            variant="contained"
            className={classes.savingButton}
          >
            Add founds
          </Button>
        </div>
        <div className={styles.boxImg}>
          <img className={styles.icon} src={saveIcon} alt="save icon" />
        </div>
      </div>

      <ul className={styles.TrackGoal}>
        {allGoals.slice(offset, offset + PER_PAGE).map((goal) => {
          return (
            <li key={goal.id}>
              <Goal
                key={goal.id}
                title={goal.goal_title}
                goalAmount={goal.goal}
              />
            </li>
          );
        })}
      </ul>
      {!isMobile && (
        <div className={styles.paginationBlock}>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={styles.pagination}
            previousLinkClassName={styles.pagination__link}
            nextLinkClassName={styles.pagination__link}
            disabledClassName={styles.pagination__linkDisabled}
            activeClassName={styles.pagination__linkActive}
          />
        </div>
      )}
    </div>
  );
};

export default Savings;
