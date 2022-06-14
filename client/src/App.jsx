import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { loginState } from "./users/atom";

import Books from "./pages/Books";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import Header from "./components/Header";
import UserInfo from "./pages/UserInfo";
import ReturnedBooks from "./pages/ReturnedBooks";

function App() {
  const logged = useRecoilValue(loginState);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Books />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path={"/signup"}
          element={!logged ? <SignUp /> : <Account />}
        ></Route>

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
