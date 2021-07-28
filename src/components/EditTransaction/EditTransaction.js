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
import { customStyles } from "../../Services/ModalCustomStyles";
import axios from "axios";
import { ContactSupportOutlined } from "@material-ui/icons";

Modal.setAppElement("#root");

const EditTransaction = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { closeModal, createTransaction, showEditModal, editID, getUserTransactions } = useDash();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  function afterOpenModal() {}

  useEffect(() => {
    getUniqueTransaction();
  }, [editID]);

  const getUniqueTransaction = () => {
    axios
      .get(
        `https://personal-financial-dashboard.herokuapp.com/transactions/${editID}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE",
            "Access-Control-Allow-Headers": "Authorization, Lang",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const transaction = res.data.rows;
        console.log(transaction)
        transaction.map((data) => {
          setTitle(data.title);
          setPrice(data.price);
          setCategory(data.category);
          
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const editTransaction = (e) => {
    e.preventDefault();
 
    axios
      .put(
        `https://personal-financial-dashboard.herokuapp.com/transactions/${editID}`,
        {
          title,
          price,
          category,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE",
            "Access-Control-Allow-Headers": "Authorization, Lang",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(`--${res}--`);
        closeModal();
        getUserTransactions();
      })
      .catch((err) => console.log(err));
  };

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
              InputProps={{
                className: classes.modalInput,
              }}
              InputLabelProps={{
                style: { color: "rgb(158, 158, 158)" },
              }}
              fullWidth
              variant="outlined"
              type="text"
              label="text"
              onChange={handleTitle}
              value={title}
            />

            <TextField
              InputProps={{
                className: classes.modalInput,
              }}
              InputLabelProps={{
                style: { color: "rgb(158, 158, 158)" },
              }}
              fullWidth
              variant="outlined"
              type="text"
              label="price"
              onChange={handlePrice}
              value={price}
            />

            <TextField
              InputProps={{
                className: classes.modalInput,
              }}
              InputLabelProps={{
                style: { color: "rgb(158, 158, 158)" },
              }}
              fullWidth
              variant="outlined"
              type="text"
              label="category"
              onChange={handleCategory}
              value={category}
            />
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
