
import React, {useState} from 'react';
import styles from './Filter.module.css';
import {useDash} from '../Context/DashContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import calendar from '../../assets/calendar.svg';

const Filter= () => {
  const {startDate, setStartDate, endDate, setEndDate} = useDash();

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
      <div className={styles.filterBox}>
       {/*  <img className={styles.calendar} src={calendar}  alt="Calendar Icon"/> */}
        <DatePicker
   /*      className={styles.customDate}
         wrapperClassName="datePicker" */
        /*   calendarClassName={styles.Test} */
 /*          className={styles.reactDatepicker} */
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </div>  
  );
};

export default Filter;