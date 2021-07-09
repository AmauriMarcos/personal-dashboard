import React, { useState } from "react";
import styles from "./Transaction.module.css";
import food from "../../../../../assets/food.svg";
import health from "../../../../../assets/health.svg";
import others from "../../../../../assets/others.svg";
import transport from "../../../../../assets/transport.svg";
import payment from "../../../../../assets/payment.svg";
import savings from "../../../../../assets/savingsIcon.svg";
import more from "../../../../../assets/more.svg";
import deleteIcon from "../../../../../assets/deleteIcon.svg";
import editIcon from "../../../../../assets/pen.svg";
import { useDash } from "../../../../Context/DashContext";
import OutsideClickHandler from "react-outside-click-handler";

const Transaction = ({
  title,
  price,
  created_at,
  category,
  typeOfCategory,
  deleteTransaction,
  id,
}) => {
  let transaction = null;
  const [showBox, setShowBox] = useState(false);

  function toggleBox() {
    setShowBox(!showBox);
  }

  const { openEditModal } = useDash();

  function transactionByCategory(typeOfCategory) {
    return (transaction = (
      <div className={styles.transaction}>
        {/* <img
          className={styles.icons}
          src={theCategory}
          alt="transaction icon"
        /> */}
        <h3>{title}</h3>
        <p className={styles.transactionDate}>{created_at}</p>

       {/*  {theCategory === payment ? (
          <p className={styles.incomePrice}>$ {price}</p>
        ) : theCategory === savings ? (
          <p className={styles.savingsPrice}>$ {price}</p>
        ) : (
          <p className={styles.expensePrice}>$ {price}</p>
        )} */}

        {typeOfCategory === 'income' ? (
          <p className={styles.incomePrice}>$ {price}</p>
        ) : typeOfCategory  === 'expense' ? (
          <p className={styles.expensePrice}>$ {price}</p>
        ) : (
          <p className={styles.savingsPrice}>$ {price}</p>
        )}  

        <img
          onClick={toggleBox}
          className={styles.iconsMore}
          src={more}
          alt="More Icon"
        />
        {showBox && (
          <OutsideClickHandler
            display="contents"
            onOutsideClick={() => {
              toggleBox();
            }}
          >
            <div className={styles.editAndDeleteBox}>
              <button
                onClick={() => openEditModal(id)}
                className={styles.editButton}
              >
                <img
                  className={styles.svgIcon}
                  src={editIcon}
                  alt="edit icon"
                />
                <p>Edit</p>
              </button>
              <button
                onClick={deleteTransaction}
                className={styles.deleteButton}
              >
                <img
                  className={styles.svgIcon}
                  src={deleteIcon}
                  alt="delete icon"
                />
                <p>Delete</p>
              </button>
            </div>
          </OutsideClickHandler>
        )}
      </div>
    ));
  }
  /* 
  console.log(showBox); */

  transactionByCategory(typeOfCategory);

/*   if (category !== "Payment" || category !== "Savings") {
    transactionByCategory(category);
  }  else if (category === "Payment") {
    transactionByCategory(payment);
  } else if (category === "Savings") {
    transactionByCategory(savings);
  }

  if( typeOfCategory === 'income'){
    transactionByCategory(category);
  }else if ( typeOfCategory === 'expense'){
    transactionByCategory(category);
  } */

  return <div>{transaction}</div>;
};

export default Transaction;
