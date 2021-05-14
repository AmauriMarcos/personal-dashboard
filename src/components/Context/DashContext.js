import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import firebase from "firebase/app";
import axios from 'axios';

const DashContext = createContext();

export function useDash() {
    return useContext(DashContext);
  }
  
export const DashProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() =>{
      getUserTransactions();
  }, []);

  const getUserTransactions= async () => {
    if (currentUser) {
      const token = await firebase.auth().currentUser.getIdToken();
      axios
        .get("http://localhost:8080/transactions", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((res) => {
          setTransactions(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const values = {
    transactions,
    setTransactions,
    currentUser
  };
  return <DashContext.Provider value={values}>{children}</DashContext.Provider>;
};
