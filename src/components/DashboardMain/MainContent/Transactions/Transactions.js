import React, { useEffect, useState } from "react";
import styles from "./Transactions.module.css";
import Transaction from "./Transaction/Transaction";
import { useDash } from "../../../Context/DashContext";
import axios from "axios";

const Transactions = () => {
  const { transactions, setTransactions, openEditModal, getTotalTransactions, allFilteredTransactions, setAllFilteredTransactions} = useDash();


  const deleteTransaction = (id) => {
    const theTransactions = [...transactions];
    const theFilteredTransactions = [...allFilteredTransactions];

    const newTransactions = theTransactions.filter((transaction) => {
      return transaction.id !== id;
    });
    const newFilteredTransactions = theFilteredTransactions.filter((transaction) => {
      return transaction.id !== id;
    });

    axios
      .delete(`http://localhost:8080/transactions/${id}`)
      .then((res) => {
        console.log(res.data);
        getTotalTransactions()
      })
      .catch((err) => console.log(err));

      setTransactions(newTransactions);
      setAllFilteredTransactions(newFilteredTransactions);
  };

  return (
    <div className={styles.Container}>
      <h2 className={styles.transactionsTitle}>Recent Transaction</h2>
      <div className={styles.Transactions}>
        {allFilteredTransactions.length === 0 ? <div className={styles.allTransactions}>
          {transactions.map((transaction) => {
            return (
              <Transaction
                key={transaction.id}
                title={transaction.title}
                created_at={transaction.created_at}
                price={transaction.price}
                category={transaction.category}
                deleteTransaction={() => deleteTransaction(transaction.id)}
                id={transaction.id}
              />
            );
          })}
        </div> : <div className={styles.allTransactions}>
          {allFilteredTransactions.map((transaction) => {
            return (
              <Transaction
                key={transaction.id}
                title={transaction.title}
                created_at={transaction.created_at}
                price={transaction.price}
                category={transaction.category}
                deleteTransaction={() => deleteTransaction(transaction.id)}
                id={transaction.id}
              />
            );
          })}
        </div>}
        
      </div>
    </div>
  );
};

export default Transactions;
