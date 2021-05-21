import React from "react";
import styles from './MainContent.module.css';
import Transactions from './Transactions/Transactions';
/* import data from "../../Nivo/Data"; */
import { MyResponsivePie } from "../../Nivo/Chart";
import {useDash} from '../../Context/DashContext';


const MainContent = () => {
  const {totalTransactions} = useDash();
  const dataChart = [];
  
  let mydata;
  mydata = totalTransactions.map((transaction) =>{
      mydata =  {
          id: transaction.category,
          label: transaction.category,
          value: transaction.price,
          color: transaction.color
      }

      dataChart.push(mydata)
      return dataChart;
  })

  console.log(dataChart);

  return (
      <div className={styles.MainContent}>
          <div className={styles.charts}>
              <MyResponsivePie  data={dataChart} className={styles.Chart}/>
          </div>
          <Transactions/>
      </div>
  )
};

export default MainContent;


