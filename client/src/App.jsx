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
import UserInfo from "./pages/UserInfo";
import ReturnedBooks from "./pages/ReturnedBooks";

import { loginState } from "./users/atom";

import { useRecoilValue } from "recoil";

function App() {
  const logged = useRecoilValue(loginState);

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/" element={<Books />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        <Route path="/returned" element={<ReturnedBooks />}></Route>

        <Route path="/account/books" element={logged && <Account />}></Route>
        <Route
          path="/account/settings"
          element={logged && <UserInfo />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
