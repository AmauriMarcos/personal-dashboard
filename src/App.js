import React from "react";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./containers/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
