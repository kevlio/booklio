import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import Home from "./pages/Home";
import Books from "./pages/Books";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";

import Header from "./components/Header";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/" element={<Books />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/account" element={<Account />}></Route>
      </Routes>
    </div>
  );
}

export default App;
