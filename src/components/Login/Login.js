import React, { useState } from "react";
import styles from "./Login.module.css";
import { useStyles } from "../../StylesMaterialUi/StylesMaterialUi";
import { Formik, Form } from "formik";
import { Button, TextField, Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import GoogleButton from "react-google-button";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../Context/AuthContext";
import brand from "../../assets/Logo.svg";
import * as yup from "yup";

let SignupSchema = yup.object().shape({
  email: yup.string().email().required("This field is required."),
  password: yup
    .string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required."),
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { login, signInwithGoogle} = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignInWithGoogle() {
    try {
      setError("");
      setLoading(true);
      await signInwithGoogle();
      history.push("/dashboard");
    } catch {
      setError("Failed sign in with Google");
    }
  }

/*   const sendJwtTokentoServer = async () => {
    const token = await firebase.auth().currentUser.getIdToken();
    try{
      await axios.get("https://personal-financial-dashboard.herokuapp.com/auth", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
    }
    catch{
      console.log("Something went wrong!");
    }
}; */

  return (
    <div className={styles.container}>
      <div className={styles.signUp}>
        <Link to="/">
          <div className={styles.brand}>
            <img src={brand} />
          </div>
        </Link>
        <div className={styles.form}>
          <p className={styles.createAccountTitlte}>Login with</p>

          <GoogleButton
            label='Google'
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
              const { email, password } = values;

              try {
                setError("");
                setLoading(true);
                await login(email, password);
                console.log(email);
                history.push("/dashboard");
              } catch {
                setError("Failed to login");
              }

              setLoading(false);
            }}
          >
            {({ errors, handleChange, touched, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
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
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  className={classes.button}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>

          <div className={styles.forgotPassword}>
            <Link to="/forgot-password">Forgot password</Link>       
          </div>
          
        </div>
        <div className={styles.accountGroup}>
          <p>
            Don't have an account? <Link to="/signUp">Sign Up</Link>
          </p>
        </div>
      </div>
      <div className={styles.imageArea}>
        <h2>
            Never spend your money <br></br> before you have it. 
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur <br></br> adipiscing elit, sed
          do eiusmod temporexercitation ullamco <br></br> laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};

export default Login;
