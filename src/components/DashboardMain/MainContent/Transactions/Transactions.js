import React, { useEffect, useState } from "react";
import styles from "./Transactions.module.css";
import Transaction from "./Transaction/Transaction";
import { useDash } from "../../../Context/DashContext";
import axios from "axios";
import ReactPaginate from "react-paginate";
import transactionIcon from '../../../../assets/transactionIcon.svg';

const Transactions = () => {
  const { transactions, setTransactions, openEditModal, getTotalTransactions, allFilteredTransactions, setAllFilteredTransactions, deleteTransaction} = useDash();
  let value;
  let progress;
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 8;
  const offset = currentPage * PER_PAGE;

  console.log(transactions)

  const pageCount = Math.ceil(transactions.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  return (
    <div className={styles.Container}>
      <div className={styles.wrapperTransactionTitleAndIcon}>
        <img src={transactionIcon}/>
        <h2 className={styles.transactionsTitle}>Recent Transaction</h2>
      </div>
      <div className={styles.Transactions}>
        {allFilteredTransactions.length === 0 ? <div className={styles.allTransactions}>
          {transactions.slice(offset, offset + PER_PAGE).map((transaction) => {
            return (
              <Transaction
                key={transaction.id}
                title={transaction.title}
                created_at={transaction.created_at}
                price={transaction.price}
                category={transaction.category}
                typeOfCategory={transaction.transaction_type}
                deleteTransaction={() => deleteTransaction(transaction.id)}
                id={transaction.id}
              />
            );
          })}
        </div> : <div className={styles.allTransactions}>
          {allFilteredTransactions.slice(offset, offset + PER_PAGE).map((transaction) => {
            return (
              <Transaction
                key={transaction.id}
                title={transaction.title}
                created_at={transaction.created_at}
                price={transaction.price}
                typeOfCategory={transaction.transaction_type}
                category={transaction.category}
                deleteTransaction={() => deleteTransaction(transaction.id)}
                id={transaction.id}
              />
            );
          })}
        </div>}
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
      </div>
     
    </div>
  );
};

export default Transactions;
