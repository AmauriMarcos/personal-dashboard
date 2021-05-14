import React from 'react';
import styles from './Transaction.module.css';
import food from '../../../../../assets/food.svg';
import health from '../../../../../assets/health.svg';
import others from '../../../../../assets/others.svg';
import transport from '../../../../../assets/transport.svg';
import more from '../../../../../assets/more.svg';

const Transaction = ({title, price, created_at, category}) =>{
    let transaction = null;
    if(category === "Food"){
        return transaction = (
            <div className={styles.transaction}>
                <img className={styles.icons} src={food} alt="Food Icon"/>
                <h3>{title}</h3>
                <p className={styles.transactionDate}>{created_at}</p>
                <p className={styles.expensePrice}>$ {price}</p>
                <img className={styles.iconsMore} src={more} alt="More Icon"/>
            </div>
        )
    }else if(category === "Health"){
        return transaction = (
            <div  className={styles.transaction}>
                <img className={styles.icons} src={health} alt="Health Icon"/>
                <h3>{title}</h3>
                <p className={styles.transactionDate}>{created_at}</p>
                <p className={styles.expensePrice}>$ {price}</p>
                <img className={styles.iconsMore} src={more} alt="More Icon"/>
            </div>
        )
    }else if(category === "Transport"){
        return transaction = (
            <div className={styles.transaction}>
                <img className={styles.icons} src={transport} alt="Delivery Icon"/>
                <h3>{title}</h3>
                <p className={styles.transactionDate}>{created_at}</p>
                <p className={styles.expensePrice}>$ {price}</p>
                <img className={styles.iconsMore} src={more} alt="More Icon"/>
            </div>
        )
    }else if(category === "Others"){
        return transaction = (
            <div className={styles.transaction}>
                <img className={styles.icons} src={others} alt="Money Icon"/>
                <h3>{title}</h3>
                <p className={styles.transactionDate}>{created_at}</p>
                <p className={styles.expensePrice}>$ {price}</p>
                <img className={styles.iconsMore} src={more} alt="More Icon"/>
            </div>
        )
    }



    return(
        <div>
            {transaction}
        </div>
     )
}

export default Transaction;