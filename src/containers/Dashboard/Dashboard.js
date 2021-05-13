import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../components/Context/AuthContext";
import firebase from "firebase/app";

const Dashboard = ({ children }) => {
  const { currentUser } = useAuth();
  /*   const data = JSON.stringify(currentUser); */

  useEffect(() => {
    auth();
  }, []);

  const auth = async () => {
    if (currentUser) {
      const token = await firebase.auth().currentUser.getIdToken();
      axios
        .get("http://localhost:8080/auth", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <p>{currentUser.uid}</p>
      <h2>Here will be the dashboard</h2>
      {children}
    </div>
  );
};

export default Dashboard;
