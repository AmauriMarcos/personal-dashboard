import React, { useEffect, useState } from "react";
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
import { ContactSupportOutlined, PinDropSharp } from "@material-ui/icons";
import Filter from "../../Filter/Filter";

const MainContent = () => {
  const {
    totalTransactions,
    filteredTransactions,
    totalTransactionsPerMonth,
    saving,
    allFilteredTransactions,
    transactions,
    expensesByPercentage,
    incomesByPercentage,
  } = useDash();
  const dataChart = [];
  const filteredDataChart = [];
  const barDataChart = [];
  const [totalMonthsFiltered, setTotalMonthsFiltered] = useState([]);

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

  const totalTransactionsPerMonthWithoutIncomes =
    totalTransactionsPerMonth.filter(
      (item) => item.transaction_type === "expense"
    );

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

  const keys = totalTransactions
    .filter((transaction) => {
      return transaction.transaction_type === "expense";
    })
    .map((item) => {
      return item.category.toLowerCase();
    });

  const colors = totalTransactionsPerMonthWithoutIncomes.map((item) => {
    return item.color;
  });

  const schemaOfColors = totalTransactionsPerMonthWithoutIncomes.reduce(
    (result, row) => {
      const category = row.category.toLowerCase();
      result[category] = row.color;
      return result;
    },
    {}
  );

  const getColor = (bar) => schemaOfColors[bar.id];
  /* *NEED to fix the data that is filtered. Have to sum the values that contains the same id/category */

  let myFilteredData;
  myFilteredData = allFilteredTransactions
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

  /* Calc to get the percentage based on the total expenses per month */

  let normalizeFilteredData = myFilteredData.map((arr, idx) => {
    return arr[idx];
  });
  console.log(normalizeFilteredData);

  /* Sum the array of object with same values */

  const filteredDataSumPerMonth = Array.from(normalizeFilteredData.reduce((acc, {value, ...r}) => {
    const id = JSON.stringify(r);
    const current = acc.get(id) || {...r, value: 0};  
    return acc.set(id, {...current, value: current.value + value});
 
  }, new Map).values());

  console.log(filteredDataSumPerMonth);

  const copyFilteredArray = JSON.parse(JSON.stringify(filteredDataSumPerMonth))

  let testFiltedTotal = copyFilteredArray.reduce((a, b) => {
    return a + b.value;
  }, 0);

  console.log(testFiltedTotal);

  let percentageFilteredDataSumPerMonth = copyFilteredArray.map((item) =>{
    let result = (item.value * 100) / testFiltedTotal;
    item.value = Number(result.toFixed(2));
    return item;
  });

  console.log(percentageFilteredDataSumPerMonth);


  let total = dataChart.reduce((a, b) => {
    return a + b.value;
  }, 0);

  let totalFiltered = normalizeFilteredData.reduce((a, b) => {
    return a + b.value;
  }, 0);

  const percentageArr = dataChart.map((v, i) => {
    let result = (v.value * 100) / total;
    return Number(result.toFixed(2));
  });

  let percentageDataChart = dataChart.map((item) => {
    let result = (item.value * 100) / total;
    item.value = Number(result.toFixed(2));
    return item;
  });

  let filtedPercentageDataChart = normalizeFilteredData.map((item) => {
    let result = (item.value * 100) / totalFiltered;
    item.value = Number(result.toFixed(2));
    return item;
  });

  /* END */

  if (expensesByPercentage === 0) {
    expenseMessage = (
      <>
        <p className={styles.sentence}>
          You don't have enough data to compare your expenses with the previous
          month
        </p>
        <strong style={{ color: "#f8f8f8" }}>0</strong>
      </>
    );
  } else if (expensesByPercentage < 100) {
    expenseMessage = (
      <>
        <p className={styles.sentence}>You have reduced your expenses by</p>
        <strong className={styles.increased}>
          {expensesByPercentage - 100}%
        </strong>
        <p className={styles.sentence}>compared to the previous month</p>
      </>
    );
  } else if (expensesByPercentage === 100) {
    expenseMessage = (
      <>
        <p className={styles.sentence}>
          You have spent the same amount compared to the previous month
        </p>
      </>
    );
  } else {
    expenseMessage = (
      <>
        <p className={styles.sentence}>You have increased your expenses in</p>
        <strong className={styles.decreased}>
          {expensesByPercentage - 100}%
        </strong>
        <p className={styles.sentence}>compared to the previous month</p>
      </>
    );
  }

  let incomeMessage = null;

  if (incomesByPercentage === 0) {
    incomeMessage = (
      <>
        <p className={styles.sentence}>
          You don't have enough data to compare your incomes with the previous
          month
        </p>
        <strong style={{ color: "#f8f8f8" }}>0</strong>
      </>
    );
  } else if (incomesByPercentage < 100) {
    incomeMessage = (
      <>
        <p className={styles.sentence}>Your income has decreased</p>
        <strong className={styles.decreased}>
          {incomesByPercentage - 100}%
        </strong>
        <p className={styles.sentence}>compared to the previous month</p>
      </>
    );
  } else if (incomesByPercentage === 100) {
    incomeMessage = (
      <>
        <p className={styles.sentence}>
          You have had the same income compared to the previous monthh
        </p>
      </>
    );
  } else if (incomesByPercentage === "undefined") {
    incomeMessage = 0;
  } else {
    incomeMessage = (
      <>
        <p className={styles.sentence}>You have increased your income in</p>
        <strong className={styles.increased}>
          {incomesByPercentage - 100}%
        </strong>
        <p className={styles.sentence}>compared to the previous month</p>
      </>
    );
  }

  return (
    <div className={styles.MainContent}>
      {transactions === null ||
      transactions.length < 1 ||
      typeof transactions[0] === "undefined" ? (
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
                <Filter className={styles.reactDatepicker} />
              </div>
            </div>

            <div className={styles.wrapperCharts}>
              <div className={styles.charts}>
                {filteredTransactions.length === 0 ? (
                  <MyResponsivePie
                    amount={total}
                    data={percentageDataChart}
                    className={styles.Chart}
                  />
                ) : (
                  <MyResponsivePie
                    amount={totalFiltered}
                    data={percentageFilteredDataSumPerMonth}
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
