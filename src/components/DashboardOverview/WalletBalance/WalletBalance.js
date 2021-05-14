import React from "react";
import styles from "./WalletBalance.module.css";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import {useStyles} from '../../../StylesMaterialUi/StylesMaterialUi';

const WalletBalance = () => {
  const classes = useStyles();
  return (
    <div className={styles.WalletBalance}>
      <h4 className={styles.title}>Wallet Balance</h4>
      <h2 className={styles.amount}>$26,584.40</h2>
      <div className={styles.incomesAndExpenses}>
        <div>
          <div className={styles.income}>
            <ArrowUpward className={classes.arrowUp} />
            <p className={styles.incomesAndExpensesValues}>$421</p>
          </div>
          <p className={styles.incomeText}>Income Today</p>
        </div>

        <div>
          <div className={styles.income}>
            <ArrowDownward className={classes.arrowDown} />
            <p className={styles.incomesAndExpensesValues}>$283</p>
          </div>
          <p className={styles.expenseText}>Expense Today</p>
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
