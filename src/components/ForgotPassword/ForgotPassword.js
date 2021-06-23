import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { useStyles } from "../../StylesMaterialUi/StylesMaterialUi";
import { Formik, Form } from "formik";
import { Button, TextField, Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../Context/AuthContext";
import * as yup from "yup";

let SignupSchema = yup.object().shape({
  email: yup.string().email().required("This field is required."),
});

  const ForgotPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 /*  async function handleSubmit(e) {
      e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for further instructions!");
    
    } catch {
      setError("Something went wrong.");
    }
    setLoading(false);
  } */

  return (
    <div className={styles.container}>
      <div className={styles.forgotPassword}>
        <div className={styles.form}>
          {message && (
            <Alert className={classes.alert} severity="success">
              {message}
            </Alert>
          )}

          <h2>Forgot Password</h2>

          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              setLoading(true);
              const { email } = values;

              await resetPassword(email);
              setMessage("Check your inbox for further instructions!");
              console.log(email);
              setLoading(false);
            }}
          >
            {({ errors, handleChange, touched, values, handleSubmit }) => (
                
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {console.log(values.email)}
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
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  className={classes.button}
                >
                  Reset Password
                </Button>
              </Form>
            )}
          </Formik>
          <div className={styles.accountGroup}>
              
            <p>
              Ready to give it another try? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
