import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useAuth } from "../Context/AuthContext";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import axios from "axios";
import transitions from "@material-ui/core/styles/transitions";

const DashContext = createContext();

export function useDash() {
  return useContext(DashContext);
}

export const DashProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [transactions, setTransactions] = useState([]);

  /* New transactions state's */
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const textRef = useRef("");
  const priceRef = useRef("");
  const categoryRef = useRef("");

  /* Modal state */
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    getUserTransactions();
  }, []);

  const getUserTransactions = async () => {
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

  function closeModal() {
    setIsOpen(false);
    setShowEditModal(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function openEditModal(id) {
    setShowEditModal(true);
    setEditID(id);
  }

  const createTransaction = async (e) => {
    e.preventDefault();

    if (currentUser) {
      const token = await firebase.auth().currentUser.getIdToken();
      const data = {
        title: textRef.current.value,
        price: priceRef.current.value,
        category: categoryRef.current.value,
      };
      axios
        .post("http://localhost:8080/transactions", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data.rows)
          getUserTransactions();  
        })
        .catch((err) => console.log(err));

      setIsOpen(false);
    }     

  };  

  const values = {
    transactions,
    getUserTransactions,
    setTransactions,
    currentUser,
    createTransaction,
    title,
    price,
    category,
    modalIsOpen,
    setIsOpen,
    textRef,
    priceRef,
    categoryRef,
    closeModal,
    openModal,
    openEditModal,
    showEditModal,
    editID,
    setEditID
  };
  return <DashContext.Provider value={values}>{children}</DashContext.Provider>;
};
