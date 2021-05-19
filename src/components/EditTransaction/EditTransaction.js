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
import axios from "axios";

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

const EditTransaction = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    closeModal,
    createTransaction,
    priceRef,
    categoryRef,
    textRef,
    showEditModal,
    editID,
  } = useDash();

  const [singleTransaction, setSingleTransaction] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  function afterOpenModal() {}

  useEffect(() => {
    getUniqueTransaction();
  }, [editID]);

  const getUniqueTransaction = async () => {
    try {
      const res = await axios.put(
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
          style={{ width: "70px", height: "70px", margin: "1rem auto 0 auto" }}
          src={editIcon}
          alt="Brand Icon"
        />
        {error && (
          <Alert className={classes.alert} severity="error">
            {error}
          </Alert>
        )}
        
        <form className={classes.form} onSubmit={createTransaction}>
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
            </Select>
          </div>
          <Button
            type="submit"
            variant="contained"
            className={classes.modalButtonForm}
          >
            Create Transaction
          </Button>
        </form>
        

      </Modal>
    </div>
  );
};

export default EditTransaction;
