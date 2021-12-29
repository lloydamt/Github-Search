import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Alert from "./components/layout/Alert";
import UserPage from "./components/users/UserPage";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import PrivateRoute from "./components/private/PrivateRoute";
import setAuthHeader from "./utils/setAuthHeader";

import GithubState from "./contexts/github/GithubState";
import AlertState from "./contexts/alert/AlertState";
import AuthState from "./contexts/auth/AuthState";

import "./App.css";

function App() {
  if (localStorage.token) {
    setAuthHeader(localStorage.token);
  }
  return (
    <AuthState>
      <GithubState>
        <AlertState>
          <Router>
            <Navbar />
            <div className='container'>
              <Alert />
            </div>
            <Routes>
              <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/' element={<Home />} />
              </Route>
              <Route exact path='/users/:username' element={<UserPage />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
            </Routes>
          </Router>
        </AlertState>
      </GithubState>
    </AuthState>
  );
}

export default App;
