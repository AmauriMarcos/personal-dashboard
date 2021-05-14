import React from "react";
import styles from "./Transactions.module.css";
import Transaction from "./Transaction/Transaction";
import { useDash } from "../../../Context/DashContext";

const Transactions = () => {
  const { transactions } = useDash();

  return (
    <div className={styles.Transactions}>
      <h2 className={styles.transactionsTitle}>Recent Transaction</h2>
      <div>
        {transactions.map((transaction) => {
          return (
            <Transaction
              key={transaction.id}
              title={transaction.title}
              created_at={transaction.created_at}
              price={transaction.price}
              category={transaction.category}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Transactions;
