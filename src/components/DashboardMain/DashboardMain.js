import React from 'react';
import styles from './DashboardMain.module.css'
import Search from './Search/Search';
import MainContent from './MainContent/MainContent';

const DashboardMain = () =>{
    return(
        <div className={styles.DashboardMain}>
            <Search/>
            <MainContent/>
        </div>
    )
}

export default DashboardMain;