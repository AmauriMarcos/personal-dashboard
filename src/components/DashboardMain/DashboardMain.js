import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useRef } from "react";
import styles from "./DashboardMain.module.css";

import Search from "./Search/Search";
import MainContent from "./MainContent/MainContent";
import ModalDashboard from "../Modal/Modal";
import EditModalComponent from "../EditTransaction/EditTransaction";
/* import GoalModal from '../GoalModal/GoalModal'; */
import { Button } from "@material-ui/core";
import { useStyles } from "../../StylesMaterialUi/StylesMaterialUi";
import { useDash } from "../Context/DashContext";
import Filter from "../Filter/Filter";
import { useMediaQuery } from "react-responsive";
import AddIcon from "@material-ui/icons/Add";


const DashboardMain = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { openModal } = useDash();
  const isMobile = useMediaQuery({ query: `(max-width: 419px)` });
  const isMobileSamsung = useMediaQuery({ query: `(max-width: 360px)` });

  let buttonCreate = null;
  if (isMobile) {
    buttonCreate = (
      <Button
        onClick={openModal}
        variant="contained"
        className={classes.modalButtonMobile}
        startIcon={<AddIcon />}
      >
        Create Transaction
      </Button>
    );
  } else if (isMobileSamsung) {
    buttonCreate = (
      <Button
        onClick={openModal}
        variant="contained"
        className={classes.modalButtonMobileSamsung}
        startIcon={<AddIcon />}
      >
        Create Transaction
      </Button>
    );
  } else {
    buttonCreate = (
     /*  <Button
        onClick={openModal}
        variant="contained"
        className={classes.modalButton}
      >
        Create Transaction
      </Button> */
      <button 
       onClick={openModal}
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        className={styles.btn}>
        Create Transaction
      </button>
    );
  }

  return (
    <div className={styles.DashboardMain}>
      <ModalDashboard />
      <EditModalComponent />

      <div className={styles.headerDashboard} >
        <div className={styles.message}>
          <h2>Welcome on board, <span>User</span></h2>
        </div>
        <div className={styles.wrapperFilterAndCreateButton}>
          <div className={styles.wrapperButton}>{buttonCreate}</div>
        {/*  <div className={styles.wrapperFilter}>
            {<Filter />}
          </div> */}
        </div>
      </div>

     
      
      <MainContent />
    </div>
  );
};

export default DashboardMain;
