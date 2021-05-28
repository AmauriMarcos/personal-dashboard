import React from "react";
import { useDash } from "../Context/DashContext";
import styles from "./GoalModal.module.css";
import Modal from "react-modal";
import {customStyles} from '../../Services/ModalCustomStyles';
import trophyIcon from '../../assets/goal.svg';
import { useStyles } from "../../StylesMaterialUi/StylesMaterialUi";
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

const Goal = () => {
  const classes = useStyles();
  const { closeModal, goalModal, createGoal, goalAmountRef, goalTitleRef} = useDash();

  return (
    <div >
      <Modal
        isOpen={goalModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img
          style={{ width: "220px", height: "220px", margin: "1rem auto 0 auto" }}
          src={trophyIcon}
          alt="Trophy Icon"
        />
      {/*   {error && (
          <Alert className={classes.alert} severity="error">
            {error}
          </Alert>
        )} */}

        <form className={classes.form} onSubmit={createGoal}>
          <div>
            <TextField
               className={classes.modalInput}
               variant="outlined"
               type="text"
               label="Give your goal a title"
               inputRef={goalTitleRef}
            />

            <TextField
              className={classes.modalInput}
              variant="outlined"
              type="text"
              label="$"
              inputRef={goalAmountRef}
            />

          </div>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            className={classes.modalButtonGoal}
          >
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Goal;
