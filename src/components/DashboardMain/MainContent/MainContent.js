import React, { useEffect } from "react";
import styles from "./MainContent.module.css";
import Transactions from "./Transactions/Transactions";
import data from "../../Nivo/BarData";
import { MyResponsivePie } from "../../Nivo/Chart";
import { useDash } from "../../Context/DashContext";
import { MyResponsiveBar } from "../../Nivo/BarChart";
import { TransactionsPerMonth } from "../../Nivo/DataBar";
import transitions from "@material-ui/core/styles/transitions";
import EmptyInbox from "../../../assets/EmptyInbox.svg";
import WalletBallance from "../../DashboardOverview/WalletBalance/WalletBalance";
import Goal from "../../DashboardOverview/Goal/GoalOverview";
import wallet from "../../../assets/wallet.svg";
import { ContactSupportOutlined } from "@material-ui/icons";

const MainContent = () => {

  const {
    totalTransactions,
    filteredTransactions,
    totalTransactionsPerMonth,
    saving,
    expensesByPercentage,
    incomesByPercentage,
  } = useDash();
  const dataChart = [];
  const filteredDataChart = [];
  const barDataChart = [];

  let mydata;
  mydata = totalTransactions
    .filter((c) => c.transaction_type === "expense")
    .map((transaction) => {
      mydata = {
        id: transaction.category.toLowerCase(),
        label: transaction.category.toLowerCase(),
        value: transaction.price,
        color: transaction.color,
      };

      dataChart.push(mydata);
      return dataChart;
    });


  const totalTransactionsPerMonthWithoutIncomes = totalTransactionsPerMonth.filter(item => item.transaction_type === 'expense');

  function getMonth(month) {
    return totalTransactionsPerMonthWithoutIncomes
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

  const keys = totalTransactions.filter((transaction) =>{
    return transaction.transaction_type === 'expense';
  }).map((item) =>{
    return item.category.toLowerCase()
  });

  const colors = totalTransactionsPerMonthWithoutIncomes.map((item) =>{
    return item.color;
  });


  const schemaOfColors = totalTransactionsPerMonthWithoutIncomes.reduce((result, row)=>{
    const category = row.category.toLowerCase();
    result[category] = row.color;
    return result
  }, {});

  const getColor = bar => schemaOfColors[bar.id]

  let myFilteredData;
  myFilteredData = filteredTransactions
    .filter((c) => c.transaction_type === "expense")
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

  let expenseMessage = null;


  if(expensesByPercentage === 0){
    expenseMessage = (
      <>
        <p className={styles.sentence}>You don't have enough data to compare your expenses with the previous month</p>
        <strong style={{color: '#f8f8f8'}}>0</strong>
      </>
    );
  }else if (expensesByPercentage < 100) {
    expenseMessage = (
      <>
        <p className={styles.sentence}>You have reduced your expenses by</p>
        <strong className={styles.increased}>{expensesByPercentage - 100}%</strong>
        <p className={styles.sentence}>compared to the previous month</p>
      </>
    );
  }else if(expensesByPercentage === 100){
    expenseMessage = (
      <>
        <p className={styles.sentence}>You have spent the same amount compared to the previous month</p>
      </>
    );
  }else{
    expenseMessage = (
      <>
        <p className={styles.sentence}>You have increased your expenses in</p>
        <strong className={styles.decreased}>{expensesByPercentage - 100}%</strong>
        <p className={styles.sentence}>compared to the previous month</p>
      </>
    );
  }

  let incomeMessage = null;

  if(incomesByPercentage === 0){
    incomeMessage = (
      <>
        <p className={styles.sentence}>You don't have enough data to compare your incomes with the previous month</p>
        <strong style={{color: '#f8f8f8'}}>0</strong>
      </>
    );
  }else if (incomesByPercentage < 100) {
    incomeMessage = (
      <>
        <p className={styles.sentence}>Your income has decreased</p>
        <strong className={styles.decreased}>{incomesByPercentage -100}%</strong>
        <p className={styles.sentence}>compared to the previous month</p>
      </>
    );
  }else if(incomesByPercentage === 100){
    incomeMessage = (
      <>
        <p className={styles.sentence}>You have had the same income compared to the previous monthh</p>
      </>
    );
  }else if(incomesByPercentage === 'undefined'){
    incomeMessage = 0
  }else{
    incomeMessage = (
      <>
        <p className={styles.sentence}>You have increased your income in</p>
        <strong className={styles.increased}>{incomesByPercentage - 100}%</strong>
        <p className={styles.sentence}>compared to the previous month</p>
      </>
    );
  }

  return (
    <div className={styles.MainContent}>
      {dataChart === null ||
      dataChart.length < 1 ||
      typeof dataChart[0] === "undefined" ? (
        <div className={styles.boxEmpty}>
          <img src={EmptyInbox} />
          <h2>You don't have any data to display yet.</h2>
          <p>
            Don't be shy. Start creating your first transaction by clicking on{" "}
            <strong>create transaction</strong> button.
          </p>
        </div>
      ) : (
        <>
          <div className={styles.mainContentBox}>
            <div className={styles.wrapperChartAndWallet}>
              <div className={styles.wallet2}>
                <WalletBallance />
              </div>

              <div className={styles.wallet}>
                <img src={wallet} />
                <h1 className={styles.amount}>
                  <span className={styles.cifrao}>$</span>
                  {saving}
                </h1>
              </div>

              <div className={styles.wallet1}>
                <Goal />
              </div>

              <div className={styles.chart1}>
                <WalletBallance />
              </div>
            </div>

            <div className={styles.wrapperCharts}>
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
          </div>

          {/* <div className={styles.boxTransactions}> */}
          <div style={{ display: "flex" }}>
            <Transactions />
            <div className={styles.barChartBoxAndPercentageByPreviousMonthBox}>
              <div className={`${styles.boxChart} ${styles.barChartBox}`}>
                <MyResponsiveBar
                  myKeys={keys}
                  colors={getColor}
                  data={mainBarData}
                  className={`${styles.boxChart} ${styles.barChart}`}
                />
              </div>
              <div
                className={`${styles.percentageNumbers} ${styles.expensesInPercentage}`}
              >
                {expenseMessage}
              </div>
              <div
                className={`${styles.percentageNumbers} ${styles.incomesInPercentage}`}
              >
                {incomeMessage}
              </div>
            </div>
          </div>
        </>
      )}

      {/* </div> */}
    </div>
  );
};

export default MainContent;
