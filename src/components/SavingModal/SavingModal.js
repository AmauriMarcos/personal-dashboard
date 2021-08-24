import React from "react";
import { useDash } from "../Context/DashContext";
import Modal from "react-modal";
import { customStyles } from "../../Services/ModalCustomStyles";
import trophyIcon from "../../assets/goal.svg";
import { useStyles } from "../../StylesMaterialUi/StylesMaterialUi";
import styles from "./SavingModal.module.css";
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";

Modal.setAppElement("#root");

const SavingModal = () => {
  const classes = useStyles();
  const {
    closeModal,
    amount,
    goalModal,
    createGoal,
    goalAmountRef,
    goalTitleRef,
    savingRef,
    savingModal,
    createSavings,
  } = useDash();

  return (
    <div>
      <Modal
        isOpen={savingModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/*   {error && (
          <Alert className={classes.alert} severity="error">
            {error}
          </Alert>
        )} */}
          
        <form className={styles.form} onSubmit={createSavings}>

          <h1 className={styles.title}>Save</h1>
          <div>
            <TextField
            InputProps={{
              className: classes.modalInput,
            }}
            InputLabelProps={{
              style: { color: "rgb(158, 158, 158)" },
            }}
            /*   className={classes.modalInput} */
              variant="outlined"
              type="text"
              label="$"
              inputRef={savingRef}
            />
          </div>
          <h2 className={styles.subTitle}>from</h2>
          <h1 className={styles.amount}>$ {amount}</h1>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            className={classes.SavingModalButton}
          >
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default SavingModal;
