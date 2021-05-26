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
import moment from 'moment';

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

  /* Main Component State, Filter, Upload Images */
  const [userURL, setUserURL] = useState(null);
  const [imageNotFoundPicture, setImageNotFoundPicture] = useState(
    "https://d3n8a8pro7vhmx.cloudfront.net/imaginebetter/pages/313/meta_images/original/blank-profile-picture-973460_1280.png?1614051091"
  );
  const [userInfo, setUserInfo] = useState({});
  const [file, setFile] = useState(null);
  const [fileFromServer, setFileFromServer] = useState(null);
  const [totalTransactions, setTotalTransactions] = useState([]);
  const [totalTransactionsPerMonth, setTotalTransactionsPerMonth] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [allFilteredTransactions, setAllFilteredTransactions] = useState([]);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  /* Overview Component State */
  const [amount, setAmount] = useState(0);
  const [dayIncome, setDayIncome] = useState(0);
  const [dayExpense, setDayExpense] = useState(0);

  useEffect(() => {
    getUserTransactions();
  }, []);

  useEffect(() =>{
    getDayTransactions();
  }, [])

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    getTotalTransactions();
  }, []);

  useEffect(() =>{
     getTotalTransactionsPerMonth();
  }, [])

  useEffect(() =>{
    getAllFilteredTransactions(); 
  }, [startDate, endDate]);

  useEffect(() =>{
    filter();
  }, [startDate, endDate]);

  /* Wallet Balance Variables */

  let incomePrices;
  let incomeAmount;

  let expensePrices;
  let expenseAmount;

  let total;

  /* Day income/expense variables */

  let dayIncomePrices;
  let dayIncomeAmount;

  let dayExpensePrices;
  let dayExpenseAmount;


  const getUserInfo = async () => {
    if (currentUser) {
      const token = await firebase.auth().currentUser.getIdToken();
      try {
        const res = await axios.get("http://localhost:8080/user/info", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const fileName = res.data[0].profile_pic;
        setUserURL(`http://localhost:8080/public/uploads/${fileName}`);
        setUserInfo(res.data);
        setFileFromServer(fileName);
      } catch {
        console.log("Error");
      }
    }
  };

  const filter = async () => {
    if (currentUser) {
      const token = await firebase.auth().currentUser.getIdToken();

      let filterDate = {
         from:  moment(startDate).format('YYYY-MM-DD'),
         to:  moment(endDate).format('YYYY-MM-DD')
      }

      try {
        const res = await axios.get(`http://localhost:8080/filter/`, {
          params: {
            date : filterDate
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        setFilteredTransactions(res.data.rows);
        getUserTransactions();
      } catch {
        console.log("Error");
      }
    }
  };



  const getAllFilteredTransactions = async () => {
    if (currentUser) {
      const token = await firebase.auth().currentUser.getIdToken();

      let filterDate = {
         from:  moment(startDate).format('YYYY-MM-DD'),
         to:  moment(endDate).format('YYYY-MM-DD')
      }

      try {
        const res = await axios.get(`http://localhost:8080/allFilteredTransactions/`, {
          params: {
            date : filterDate
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        setAllFilteredTransactions(res.data.rows)
      } catch {
        console.log("Error");
      }
    }
  };

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

        let incomes = res.data
        .filter((t) => t.category === "Payment")
        .map((income) => {
          return income;
        });

        let expenses = res.data
        .filter((t) => t.category !== "Payment")
        .map((expense) => {
          return expense;
        });
    
        function sum(nums) {
          return nums.reduce((a, b) => a + b);
        }
      
        incomePrices = incomes.map((item) => item.price);
        expensePrices = expenses.map((item) => item.price);

        expenseAmount = sum(expensePrices);
        incomeAmount = sum(incomePrices);
        
        total = incomeAmount - expenseAmount;

        setAmount(total.toFixed(2));
         
        })
        .catch((err) => console.log(err));
    }
  };

  const getDayTransactions = async() =>{
    if (currentUser) {
      const token = await firebase.auth().currentUser.getIdToken();
      axios
        .get("http://localhost:8080/transactions/currentDay", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((res) => {
         /*  let dayIncomePrices;
          let dayIncomeAmount;
        
          let dayExpensePrices;
          let dayExpenseAmount; */

          
        let incomes = res.data
        .filter((t) => t.category === "Payment")
        .map((income) => {
          return income;
        });

        let expenses = res.data
        .filter((t) => t.category !== "Payment")
        .map((expense) => {
          return expense;
        });
    
        function sum(nums) {
          return nums.reduce((a, b) => a + b);
        }
      
        dayIncomePrices = incomes.map((item) => item.price);
        dayExpensePrices = expenses.map((item) => item.price);

        dayExpenseAmount = sum(dayExpensePrices);
        dayIncomeAmount = sum(dayIncomePrices);

        setDayExpense(dayExpenseAmount);
        setDayIncome(dayIncomeAmount);
          
          
        })
        .catch((err) => console.log(err));
    }
  }

  const getTotalTransactions = async () => {
    if (currentUser) {
      const token = await firebase.auth().currentUser.getIdToken();
      axios
        .get("http://localhost:8080/totalTransactions", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((res) => {
          setTotalTransactions(res.data);
          
        })
        .catch((err) => console.log(err));
    }
  };

  const getTotalTransactionsPerMonth = async () => {
    if (currentUser) {
      const token = await firebase.auth().currentUser.getIdToken();
      axios
        .get("http://localhost:8080/totalTransactionsPerMonth", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((res) => {
          setTotalTransactionsPerMonth(res.data);
          getUserTransactions();
        })
        .catch((err) => console.log(err));
    }
  };


  const createTransaction = async (e) => {
    e.preventDefault();

    if (currentUser) {
      const token = await firebase.auth().currentUser.getIdToken();

      let uniqueColor;
      if (categoryRef.current.value === "Food") {
        uniqueColor = "#063951";
      } else if (categoryRef.current.value === "Others") {
        uniqueColor = "#C13018";
      } else if (categoryRef.current.value === "Health") {
        uniqueColor = "#2BC4A9";
      } else if (categoryRef.current.value === "Transport"){
        uniqueColor = "#0D95BC";
      }

      console.log(uniqueColor);

      const data = {
        title: textRef.current.value,
        price: priceRef.current.value,
        category: categoryRef.current.value,
        color: uniqueColor,
      };
      axios
        .post("http://localhost:8080/transactions", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data.rows);
          getUserTransactions();
          getTotalTransactions();
          getDayTransactions();
        })
        .catch((err) => console.log(err));

      setIsOpen(false);
    }
  };

  const uploadImage = async (e) => {
    if (currentUser) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("avatar", file);
      const token = await firebase.auth().currentUser.getIdToken();
      await axios
        .post("http://localhost:8080/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        })
        .then((res) => {
          history.push("/dashboard");
          getUserInfo();
        });
    }
  };

  const deleteTransaction = (id) => {
    const theTransactions = [...transactions];
    const theFilteredTransactions = [...allFilteredTransactions];

    const newTransactions = theTransactions.filter((transaction) => {
      return transaction.id !== id;
    });
    const newFilteredTransactions = theFilteredTransactions.filter((transaction) => {
      return transaction.id !== id;
    });

    axios
      .delete(`http://localhost:8080/transactions/${id}`)
      .then((res) => {
        console.log(res.data);
        getTotalTransactions()
      })
      .catch((err) => console.log(err));

      setTransactions(newTransactions);
      setAllFilteredTransactions(newFilteredTransactions);
      getUserTransactions();
      getDayTransactions();
  };

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

/*   const handleFilterMonth = (e) => {
    setPickedMonth(e.target.value);
  }; */

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
    setEditID,
    userURL,
    imageNotFoundPicture,
    userInfo,
    getUserInfo,
    handleChange,
    uploadImage,
    fileFromServer,
    totalTransactions,
    getTotalTransactions,
    startDate, 
    setStartDate,
    endDate,
    setEndDate,
    filteredTransactions,
    allFilteredTransactions,
    getAllFilteredTransactions,
    setAllFilteredTransactions,
    totalTransactionsPerMonth,
    deleteTransaction,
    amount,
    dayIncome,
    dayExpense
  };
  return <DashContext.Provider value={values}>{children}</DashContext.Provider>;
};
