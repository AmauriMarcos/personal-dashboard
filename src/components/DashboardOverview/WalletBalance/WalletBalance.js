import React, {useState} from "react";
import styles from "./WalletBalance.module.css";
import { Switch } from '@material-ui/core';
import {
  ArrowUpward,
  ArrowDownward,
  PaymentOutlined,
} from "@material-ui/icons";
import { useStyles } from "../../../StylesMaterialUi/StylesMaterialUi";
import { useDash } from "../../Context/DashContext";

const WalletBalance = () => {
  const classes = useStyles();
  const { amount, dayIncome, dayExpense } = useDash();

  const [showAmount, setShowAmount] = useState(true);

  const toggleAmount = (event) =>{
     setShowAmount(event.target.checked);
  }

  return (
    <div className={styles.WalletBalance}>
     <Switch
        checked={showAmount}
        onChange={toggleAmount}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <h4 className={styles.title}>Wallet Balance</h4>
   
      {showAmount && <h2 className={styles.amount}>${amount}</h2>}
      <div className={styles.incomesAndExpenses}>
        <div>
          <div className={styles.income}>
            <ArrowUpward className={classes.arrowUp} />
            <p className={styles.incomesAndExpensesValues}>$ {dayIncome}</p>
          </div>
          <p className={styles.incomeText}>Income Today</p>
        </div>

        <div>
          <div className={styles.income}>
            <ArrowDownward className={classes.arrowDown} />
            <p className={styles.incomesAndExpensesValues}>$ {dayExpense}</p>
          </div>
          <p className={styles.expenseText}>Expense Today</p>
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
