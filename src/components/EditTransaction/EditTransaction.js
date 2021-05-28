import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { Alert } from "@material-ui/lab";
import editIcon from "../../assets/pen.svg";
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";
import { useStyles } from "../../StylesMaterialUi/StylesMaterialUi";
import { useDash } from "../Context/DashContext";
import {customStyles} from '../../Services/ModalCustomStyles';
import axios from "axios";

Modal.setAppElement("#root");

const EditTransaction = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    closeModal,
    createTransaction,
    showEditModal,
    editID,
  } = useDash();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  function afterOpenModal() {}

  useEffect(() => {
    getUniqueTransaction();
  }, [editID]);

  const getUniqueTransaction = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/transactions/${editID}`
      );
      const transaction = res.data.rows;
      transaction.map((data) => {
        setTitle(data.title);
        setPrice(data.price);
        setCategory(data.category);
      });
    } catch {
      console.log("Something went wrong!!!");
    }
  };

  const handleTitle = (e) =>{
        setTitle(e.target.value);
  }

  const handlePrice = (e) =>{
      setPrice(e.target.value);
  }

  const handleCategory = (e) =>{
      setCategory(e.target.value);
  }

  const editTransaction = async () => {
    try{
      await axios.put(`http://localhost:8080/transactions/${editID}`, {
        title,
        price,
        category
      });
    }
    catch{
      console.log("Something went wrong !");
    }
      
  }

  return (
    <div>
      <Modal
        isOpen={showEditModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img
          style={{ width: "60px", height: "60px", margin: "1rem auto 0 auto" }}
          src={editIcon}
          alt="Brand Icon"
        />
        {error && (
          <Alert className={classes.alert} severity="error">
            {error}
          </Alert>
        )}
        
        <form className={classes.form} onSubmit={editTransaction}>
          <div>
            <TextField
              className={classes.modalInput}
              variant="outlined"
              type="text"
              label="text"
              onChange={handleTitle}
              value={title}
            />

            <TextField
              className={classes.modalInput}
              variant="outlined"
              type="text"
              label="Price"
              onChange={handlePrice}
              value={price}
            />

            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Category"
              variant="outlined"
              fullWidth
              onChange={handleCategory}
              value={category}
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
              <MenuItem value="Payment">Payment</MenuItem>
              <MenuItem value="Savings">Savings</MenuItem>
            </Select>
          </div>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            className={classes.modalButtonEdit}
          >
            Edit
          </Button>
        </form>
        

      </Modal>
    </div>
  );
};

export default EditTransaction;
