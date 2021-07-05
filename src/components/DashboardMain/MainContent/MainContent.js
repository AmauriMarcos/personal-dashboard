import React, { useEffect } from "react";
import styles from "./MainContent.module.css";
import Transactions from "./Transactions/Transactions";
import data from "../../Nivo/BarData";
import { MyResponsivePie } from "../../Nivo/Chart";
import { useDash } from "../../Context/DashContext";
import { MyResponsiveBar } from "../../Nivo/BarChart";
import { TransactionsPerMonth } from "../../Nivo/DataBar";
import transitions from "@material-ui/core/styles/transitions";
import EmptyInbox from '../../../assets/EmptyInbox.svg';

const MainContent = () => {
  const { totalTransactions, filteredTransactions, totalTransactionsPerMonth } =
    useDash();
  const dataChart = [];
  const filteredDataChart = [];
  const barDataChart = [];

  let mydata;
  mydata = totalTransactions
    .filter((c) => c.category !== "Payment" && c.category !== "Savings")
    .map((transaction) => {
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
      .filter(({ monthname }) => month === monthname)
      .reduce((result, row) => {
        const category = row.category.toLowerCase();
        result["month"] = month;
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

  barDataChart.push(
    janData,
    fevData,
    marData,
    aprData,
    mayData,
    junData,
    julData,
    augData,
    sepData,
    octData,
    novData,
    decData
  );

  let mainBarData = barDataChart.filter(
    (value) => Object.keys(value).length !== 0
  );

  let myFilteredData;
  myFilteredData = filteredTransactions
    .filter((c) => c.category !== "Payment" && c.category !== "Savings")
    .map((transaction) => {
      myFilteredData = {
        id: transaction.category,
        label: transaction.category,
        value: transaction.price,
        color: transaction.color,
      };

      filteredDataChart.push(myFilteredData);
      return filteredDataChart;
    });


    const colors = {'foodColor': "#063951", 'othersColor': "#C13018", 'transportColor': "#0D95BC", "healthColor": "#2BC4A9"}

    const getColor = bar => colors[bar];

    console.log(getColor())
   
  return (
    <div className={styles.MainContent}>
      {dataChart === null || dataChart.length < 1 || typeof dataChart[0] === 'undefined'? (
        <div className={styles.boxEmpty}>
          <img src={EmptyInbox} />
          <h2>You don't have any data to display yet.</h2>
          <p>Don't be shy. Start creating your first transaction by clicking on <strong>create transaction</strong> button.</p>
        </div>
      ) : (
        <>
          <div className={`${styles.boxChart} ${styles.wrapperCharts}`}>
            <div className={styles.boxChart}>
              <MyResponsiveBar
                colors={getColor}
                data={mainBarData}
                className={`${styles.boxChart} ${styles.barChart}`}
              />
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
          {/* <div className={styles.boxTransactions}> */}
          <Transactions />
        </>
      )}

      {/* </div> */}
    </div>
  );
};

export default MainContent;
