import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import brand from "../../assets/Brand.svg";
import { Alert } from "@material-ui/lab";
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  unstable_createMuiStrictModeTheme as createMuiTheme
} from "@material-ui/core";
import { useStyles } from "../../StylesMaterialUi/StylesMaterialUi";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { TitleRounded } from "@material-ui/icons";
import {useDash} from '../Context/DashContext';

let SignupSchema = yup.object().shape({
  email: yup.string().email().required("This field is required."),
  password: yup
    .string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required."),
});

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItem: "center",
    width: "450px",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};



Modal.setAppElement("#root");

const ModalDashboard = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {closeModal, modalIsOpen, setIsOpen, title, price, category, createTransaction, priceRef, categoryRef,  textRef ,getUserTransactions, transactions} = useDash();

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img style={{width:"130px", height: "130px", margin: "0 auto"}} src={brand} alt="Brand Icon"/>

        {error && (
            <Alert className={classes.alert} severity="error">
              {error}
            </Alert>
        )}
    
        <form className={classes.form} onSubmit={createTransaction}>
          <TextField        
            className={classes.modalInput}
            variant="outlined"
            type="text"
            label="text"
            inputRef={textRef}
    
          />          
          <TextField        
            className={classes.modalInput}
            variant="outlined"
            type="text"
            label="Price"
            inputRef={priceRef}
      
          />
     
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Category"
            variant="outlined"
            inputRef={categoryRef}
            fullWidth
            
          >
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Transport">Transport</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
            <MenuItem value="Payment">Payment</MenuItem>
          </Select>
          <Button  type="submit" variant="contained" className={classes.modalButtonForm}>
            Create Transaction
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default ModalDashboard;
