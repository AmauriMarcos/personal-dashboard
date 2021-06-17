import React, {useState} from 'react';
import styles from './Filter.module.css';
import {useDash} from '../Context/DashContext';
import DatePicker from 'react-datepicker';
import calendar from '../../assets/calendar.svg';

const Filter= () => {
  const {startDate, setStartDate, endDate, setEndDate} = useDash();

  return (
      <div className={styles.filterBox}>
        <img className={styles.calendar} src={calendar}  alt="Calendar Icon"/>
        <DatePicker
          className={styles.filter}
          selected={startDate}
          onChange={date => setStartDate(date)}
          isClearable={true}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <p className={styles.to}>to</p>
        <DatePicker
         className={styles.filter}
          selected={endDate}
          onChange={date => setEndDate(date)}
          isClearable={true}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>  
  );
};

export default Filter;