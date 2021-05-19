import React from "react";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./containers/Dashboard/Dashboard";
import Nav from "./components/DashboardNavbar/DashboardNavbar";
import Main from "./components/DashboardMain/DashboardMain";
import Overview from "./components/DashboardOverview/DashboardOverview";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext";
import { DashProvider } from "./components/Context/DashContext";
import EditTransaction from "./components/EditTransaction/EditTransaction";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signUp" component={SignUp} />
            <DashProvider>
              <Route path="/dashboard">
                <Dashboard>
                  <Nav />
                  <Main />
                  <Overview />
                </Dashboard>
              </Route>
              <Route path="/dashboard/edit" component={EditTransaction} />
            </DashProvider>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
