import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase";
import firebase from "firebase/app";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);   
  }

  function login(email, password){
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout(){
    return auth.signOut();
  }

  function resetPassword(email){
    return auth.sendPasswordResetEmail(email);
  }

  const googleProvider =  new firebase.auth.GoogleAuthProvider()
  function signInwithGoogle(){
    return auth.signInWithPopup(googleProvider)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
      setLoading(false);    
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signUp,
    logout,
    resetPassword,
    signInwithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  );
};
