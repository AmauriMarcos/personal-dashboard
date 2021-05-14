import React from "react";
import styles from "./Transactions.module.css";
import Transaction from "./Transaction/Transaction";
import { useDash } from "../../../Context/DashContext";

const Transactions = () => {
  const { transactions } = useDash();

  return (
    <div className={styles.Container}>
      <h2 className={styles.transactionsTitle}>Recent Transaction</h2>
      <div className={styles.Transactions}>
        <div className={styles.allTransactions}>
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
    </div>
  );
};

export default Transactions;
