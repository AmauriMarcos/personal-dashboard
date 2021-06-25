import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import brand from "../../assets/Brand.svg";
import { Alert } from "@material-ui/lab";
import { customStyles } from "../../Services/ModalCustomStyles";
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
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { TitleRounded } from "@material-ui/icons";
import { useDash } from "../Context/DashContext";

let SignupSchema = Yup.object().shape({
  title: Yup.string().required("This field is required."),
  price: Yup.string().required("This field is required."),
  category: Yup.string().required("This field is required."),
});

Modal.setAppElement("#root");

const ModalDashboard = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    closeModal,
    modalIsOpen,
    setIsOpen,
    createTransaction,
    errorMessage,
  } = useDash();

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
        <img
          style={{ width: "130px", height: "130px", margin: "0 auto" }}
          src={brand}
          alt="Brand Icon"
        />

        {errorMessage && (
          <Alert className={classes.alert} severity="error">
            {errorMessage}
          </Alert>
        )}

        <Formik
          initialValues={{
            title: "",
            price: "",
            category: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            const { title, price, category} = values;

            setError("");
            setLoading(true);

            createTransaction(title, price, category);
            setIsOpen(false);

            setLoading(false);
          }}
        >
          {({ errors, handleChange, touched, values }) => (
            <Form>
              <TextField
                error={errors.title && touched.title}
                onChange={handleChange}
                type="text"
                value={values.title}
                id="title"
                name="title"
                label="Transaction title"
                variant="outlined"
                fullWidth
                helperText={errors.title && touched.title ? errors.title : null}
              />

              <TextField
                error={errors.price && touched.price}
                onChange={handleChange}
                value={values.price}
                type="text"
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                fullWidth
                helperText={errors.price && touched.price ? errors.price : null}
              />

              <InputLabel className={classes.modalLabelInput} id="label">
                Categories
              </InputLabel>
              <Select
                labelId="label"
                error={errors.category && touched.category}
                id="category"
                name="category"
                onChange={handleChange}
                label="Category"
                variant="outlined"
                type="text"
                helperText={
                  errors.category && touched.category ? errors.category : null
                }
                fullWidth
              >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Transport">Transport</MenuItem>
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
                <MenuItem value="Payment">Payment</MenuItem>
              </Select>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                className={classes.modalButtonForm}
              >
                Create Transaction
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ModalDashboard;
