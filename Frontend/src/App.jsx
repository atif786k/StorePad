import "./App.css";
import SignIn from "./auth/SignIn";
import Login from "./auth/Login";
import MainFrame from "./utils/MainFrame";
import LandingPage from "./LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app-container">
        <Router>
          <Routes>
            <Route exact path="/" element={<LandingPage />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signin" element={<SignIn />}></Route>
            <Route exact path="/main" element={<MainFrame/>}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
