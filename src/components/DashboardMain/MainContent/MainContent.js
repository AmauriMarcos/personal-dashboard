import React, { useEffect } from "react";
import styles from "./MainContent.module.css";
import Transactions from "./Transactions/Transactions";
import data from "../../Nivo/BarData";
import { MyResponsivePie } from "../../Nivo/Chart";
import { useDash } from "../../Context/DashContext";
import { MyResponsiveBar } from "../../Nivo/BarChart";
import {TransactionsPerMonth} from '../../Nivo/DataBar';
import transitions from "@material-ui/core/styles/transitions";

const MainContent = () => {
  const { totalTransactions, filteredTransactions, totalTransactionsPerMonth } = useDash();
  const dataChart = [];
  const filteredDataChart = [];
  const barDataChart = [];

  useEffect(() =>{

  })

  let mydata;
  mydata = totalTransactions.map((transaction) => {
    mydata = {
      id: transaction.category,
      label: transaction.category,
      value: transaction.price,
      color: transaction.color,
    };

    dataChart.push(mydata);
    return dataChart;
  });

  function getMonth(month) {
   return totalTransactionsPerMonth
        .filter(({monthname}) => month === monthname)
        .reduce((result, row) => {
            const category = row.category.toLowerCase();
            result['month'] = month;
            result[category] = row.price;
            result[`${category}Color`] = row.color;
            return result;
        }, {});
}


  let janData = getMonth("Jan");
  let fevData = getMonth("Feb");
  let marData = getMonth("Mar");
  let aprData = getMonth("Apr");
  let mayData = getMonth("May");
  let junData = getMonth("Jun");
  let julData = getMonth("Jul");
  let augData = getMonth("Aug");
  let sepData = getMonth("Sep");
  let octData = getMonth("Oct");
  let novData = getMonth("Nov");
  let decData = getMonth("Dec");

  barDataChart.push(janData, fevData, marData, aprData, mayData, junData, julData, augData, sepData, octData, novData, decData);

  console.log(barDataChart);



  let myFilteredData;
  myFilteredData = filteredTransactions.map((transaction) => {
    myFilteredData = {
      id: transaction.category,
      label: transaction.category,
      value: transaction.price,
      color: transaction.color,
    };

    filteredDataChart.push(myFilteredData);
    return filteredDataChart;
  });

  const getColor = bar => barDataChart[bar.id];
  console.log(getColor);

  return (
    <div className={styles.MainContent}>
      <div className={styles.boxChart}>
        <div className={styles.boxChart}>
          <MyResponsiveBar  data={barDataChart} className={styles.boxChart}/>
        </div>
        <div className={styles.charts}>
          {filteredTransactions.length === 0 ? (
            <MyResponsivePie data={dataChart} className={styles.Chart} />
          ) : (
            <MyResponsivePie
              data={filteredDataChart}
              className={styles.Chart}
            />
          )}
        </div>
      </div>
      <Transactions />
    </div>
  );
};

export default MainContent;
