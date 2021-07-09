import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import brand from "../../assets/Logo.svg";
import { Alert } from "@material-ui/lab";
import { customStyles } from "../../Services/ModalCustomStyles";
import {
  Button,
  TextField,
  Typography,
  Select,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  MenuItem,
  InputLabel,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";
import { useStyles } from "../../StylesMaterialUi/StylesMaterialUi";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { TitleRounded } from "@material-ui/icons";
import { useDash } from "../Context/DashContext";
import { CirclePicker } from "react-color";
import styles from "./Modal.module.css";
import {withStyles} from '@material-ui/core/styles';
import {purple} from '@material-ui/core/colors';

const PurpleRadio = withStyles({
  root: {
      color: purple[400],
      '&$checked': {
          color: purple[600],
      },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

let SignupSchema = Yup.object().shape({
  title: Yup.string().required("This field is required."),
  price: Yup.string().required("This field is required."),
  category: Yup.string().required("This field is required."),
});

Modal.setAppElement("#root");

const ModalDashboard = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [colorPick, setColorPick] = useState("#fff");
  const [loading, setLoading] = useState(false);

  const[typeOfTransaction, setTypeOfTransaction] = useState("");

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

  const handleRadioInput = (e) =>{
    setTypeOfTransaction(e.target.value);
  } 

  const handleColor = (color) => {
    setColorPick(color.hex);
  };


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
          style={{ width: "60px", height: "60px", margin: "1rem auto" }}
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
            const { title, price, category } = values;

            setError("");
            setLoading(true);

            createTransaction(title, price, category, colorPick, typeOfTransaction);
            setIsOpen(false);

            setLoading(false);
          }}
        >
          {({ errors, handleChange, touched, values }) => (
            <Form style={{ width: "90%", margin: "0 auto" }}>
              <TextField
                InputProps={{
                  className: classes.modalInput,
                }}
                InputLabelProps={{
                  style: { color: "rgb(158, 158, 158)" },
                }}
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

              <FormControl component="fieldset" className={classes.formControlRadio}>
                <FormLabel style={{color: "rgb(158, 158, 158)", marginBottom: "1rem"}} component="legend">
                  Which type of transaction is?
                </FormLabel>
                <RadioGroup                
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    label={<p style={{color: "rgb(158, 158, 158)"}}>income</p>}
                    value="income"
                    control={<PurpleRadio />}  
                    onChange={handleRadioInput}              
                  />
                  <FormControlLabel
                    label={<p style={{color: "rgb(158, 158, 158)"}}>expense</p>}
                    value="expense"
                    control={<PurpleRadio />}    
                    onChange={handleRadioInput}               
                  />
                </RadioGroup>
              </FormControl>
              
              <TextField
                InputProps={{
                  className: classes.modalInput,
                }}
                InputLabelProps={{
                  style: { color: "rgb(158, 158, 158)" },
                }}
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

              <TextField
                InputProps={{
                  className: classes.modalInput,
                }}
                InputLabelProps={{
                  style: { color: "rgb(158, 158, 158)" },
                }}
                error={errors.category && touched.category}
                onChange={handleChange}
                value={values.category}
                type="text"
                id="category"
                name="category"
                label="Category"
                variant="outlined"
                fullWidth
                helperText={
                  errors.category && touched.category ? errors.category : null
                }
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "1rem 0 2rem 0",
                }}
              >
                <p style={{ color: "#fff", margin: "1rem 0" }}>
                  Give your "Category" a color:
                </p>
                <CirclePicker onChange={handleColor} value={colorPick} />
              </div>

              <p
                style={{
                  color: `${colorPick}`,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {values.category}
              </p>

              <button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                className={styles.btn}
              >
                Create Transaction
              </button>
              {/*   <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                className={classes.modalButtonForm}
              >
                Create Transaction
              </Button> */}
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ModalDashboard;
