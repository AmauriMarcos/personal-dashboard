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

const DashboardMain = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { openModal } = useDash();

  return (
    <div className={styles.DashboardMain}>
      <ModalDashboard />
      <EditModalComponent />
  {/*     <GoalModal/> */}
      <div className={styles.wrapperButton}>
        <Button
          onClick={openModal}
          variant="contained"
          className={classes.modalButton}
        >
          Create Transaction
        </Button>
      </div>
      <div className={styles.wrapperFilter}>
        <Filter />
      </div>
      <Search />
      <MainContent />
    </div>
  );
};

export default DashboardMain;
