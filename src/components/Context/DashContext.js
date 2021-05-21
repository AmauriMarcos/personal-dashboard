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

  /* User Info State */
  const [userURL, setUserURL] = useState(null);
  const [imageNotFoundPicture, setImageNotFoundPicture] = useState("https://d3n8a8pro7vhmx.cloudfront.net/imaginebetter/pages/313/meta_images/original/blank-profile-picture-973460_1280.png?1614051091")
  const [userInfo, setUserInfo] = useState({});
  const [file, setFile] = useState(null);
  const [fileFromServer, setFileFromServer] = useState(null);
  const [totalTransactions, setTotalTransactions] = useState([]);

  useEffect(() => {
    getUserTransactions();
  }, []);

  useEffect(() =>{
    getUserInfo();
  }, [])

  useEffect(() =>{
    getTotalTransactions();
  }, [])

  const getUserInfo =  async () => {
    if(currentUser){
    const token = await firebase.auth().currentUser.getIdToken();
    try{
     const res =  await axios.get('http://localhost:8080/user/info', {
        headers: {
          "Content-Type": "application/json",      
          Authorization: token,
        },
      })
      const fileName = res.data[0].profile_pic;
      setUserURL(`http://localhost:8080/public/uploads/${fileName}`);
      setUserInfo(res.data);
      setFileFromServer(fileName);
     
    }catch{
      console.log("Error")
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
          console.log(res.data);
          setTransactions(res.data);
          
        })
        .catch((err) => console.log(err));
    }
  };

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


  const createTransaction = async (e) => {
    e.preventDefault();

    if (currentUser) {
      const token = await firebase.auth().currentUser.getIdToken();

      let uniqueColor;
      if(categoryRef.current.value === "Food"){
         uniqueColor = "#063951"
      }else if(categoryRef.current.value === "Others"){
        uniqueColor = "#C13018"
      }else if(categoryRef.current.value === "Health"){
        uniqueColor = "#2BC4A9"
      }else{
        uniqueColor = "#0D95BC"
      }

      console.log(uniqueColor);

      const data = {
        title: textRef.current.value,
        price: priceRef.current.value,
        category: categoryRef.current.value,
        color: uniqueColor
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
          getTotalTransactions(); 
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

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    setFile(selectedFile);
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
    getTotalTransactions
  };
  return <DashContext.Provider value={values}>{children}</DashContext.Provider>;
};
