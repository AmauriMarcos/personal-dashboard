import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { useStyles } from "../../StylesMaterialUi/StylesMaterialUi";
import { Formik, Form } from "formik";
import { Button, TextField, Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useAuth } from "../Context/AuthContext";
import brand from "../../assets/Logo.svg";
import GoogleButton from "react-google-button";
import { SignupSchema } from "../../Services/YupSchema/YupSchema";
import axios from "axios";
import firebase from "firebase/app";

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const { signUp, currentUser, signInwithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSignInWithGoogle() {
    try {
      setError("");
      setLoading(true);
      await signInwithGoogle();
      sendJwtTokentoServer();
      history.push("/dashboard");
    } catch {
      setError("Failed sign in with Google");
    }
  }

  const sendJwtTokentoServer = async () => {
      const token = await firebase.auth().currentUser.getIdToken();
      try{
        await axios.get("https://personal-financial-dashboard.herokuapp.com/auth", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
      }
      catch{
        console.log("Something went wrong!");
      }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signUp}>
        <Link to="/">
          <div className={styles.brand}>
            <img src={brand} />
          </div>
        </Link>
        <div className={styles.form}>
          <p className={styles.createAccountTitlte}>Create an account with</p>
          <GoogleButton
            onClick={handleSignInWithGoogle}
            style={{ margin: "1rem auto" }}
          />
          <p className={styles.orSpan}>or</p>

          {error && (
            <Alert className={classes.alert} severity="error">
              {error}
            </Alert>
          )}

          <Formik
            initialValues={{
              email: "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              const { email, password, passwordConfirmation } = values;

              if (password !== passwordConfirmation) {
                return setError("Password do not match");
              }

              try {
                setError("");
                setLoading(true);
                await signUp(email, password);
                await sendJwtTokentoServer();
                
              } catch {
                setError("Failed to create an account");
              }

              history.push("/dashboard");
              setLoading(false);
            }}
          >
            {({ errors, handleChange, touched, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                     InputProps={{
                      className: classes.loginInput
                    }}
                    InputLabelProps={{
                      style: {color: "rgb(158, 158, 158)"}
                    }}
                      error={errors.email && touched.email}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      helperText={
                        errors.email && touched.email ? errors.email : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                     InputProps={{
                      className: classes.loginInput
                    }}
                    InputLabelProps={{
                      style: {color: "rgb(158, 158, 158)"}
                    }}
                      error={errors.password && touched.password}
                      onChange={handleChange}
                      value={values.password}
                      type="password"
                      id="password"
                      name="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      helperText={
                        errors.password && touched.password
                          ? errors.password
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                     InputProps={{
                      className: classes.loginInput
                    }}
                    InputLabelProps={{
                      style: {color: "rgb(158, 158, 158)"}
                    }}
                      error={
                        errors.passwordConfirmation &&
                        touched.passwordConfirmation
                      }
                      onChange={handleChange}
                      type="password"
                      value={values.passwordConfirmation}
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      label="Confirm password"
                      variant="outlined"
                      fullWidth
                      helperText={
                        errors.passwordConfirmation &&
                        touched.passwordConfirmation
                          ? errors.passwordConfirmation
                          : null
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  className={classes.button}
                >
                  Get Started
                </Button>
               {/*  <button 
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  className={styles.btn}>
                  Create account
              </button> */}
              </Form>
            )}
          </Formik>
        </div>
        <div className={styles.accountGroup}>
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
      <div className={styles.imageArea}>
     {/*    <h2>
        I don’t need it to be easy,  I need it to be worth it. 
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur <br></br> adipiscing elit, sed
          do eiusmod temporexercitation ullamco <br></br> laboris nisi ut
          aliquip ex ea commodo consequat.
        </p> */}
      </div>
    </div>
  );
};

export default SignUp;
