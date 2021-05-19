import React, {useState} from "react";
import styles from "./Transaction.module.css";
import food from "../../../../../assets/food.svg";
import health from "../../../../../assets/health.svg";
import others from "../../../../../assets/others.svg";
import transport from "../../../../../assets/transport.svg";
import more from "../../../../../assets/more.svg";
import deleteIcon from "../../../../../assets/deleteIcon.svg";
import editIcon from "../../../../../assets/pen.svg";
import {useDash} from '../../../../Context/DashContext';

const Transaction = ({
  title,
  price,
  created_at,
  category,
  deleteTransaction,
  id
}) => {
  let transaction = null;
  const [showBox, setShowBox] = useState(false);

  function toggleBox(){
      setShowBox(!showBox);
  }

  const {openEditModal} = useDash();

  function transactionByCategory(theCategory) {
    return (transaction = (
      <div className={styles.transaction}>
        <img className={styles.icons} src={theCategory} alt="Food Icon" />
        <h3>{title}</h3>
        <p className={styles.transactionDate}>{created_at}</p>
        <p className={styles.expensePrice}>$ {price}</p>
        <img
          onClick={toggleBox}
          className={styles.iconsMore}
          src={more}
          alt="More Icon"
        />
        {showBox && (
        <div className={styles.editAndDeleteBox}>
          <button onClick={() => openEditModal(id)} className={styles.editButton}>
            <img src={editIcon} alt="edit icon" />
            <p>Edit</p>
          </button>
          <button onClick={deleteTransaction} className={styles.deleteButton}>
            <img src={deleteIcon} alt="delete icon" />
            <p>Delete</p>
          </button>
        </div>
      )}
      </div>
    ));
  }
/* 
  console.log(showBox); */

  if (category === "Food") {
    transactionByCategory(food);
  } else if (category === "Health") {
    transactionByCategory(health);
  } else if (category === "Transport") {
    transactionByCategory(transport);
  } else if (category === "Others") {
    transactionByCategory(others);
  }

  return (
    <div>
      {transaction}
      
    </div>
  );
};

export default Transaction;
