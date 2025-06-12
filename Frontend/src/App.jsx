import "./App.css";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import MainFrame from "./pages/MainFrame";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <div className="app-container">
        <UserProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<MainFrame />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signin" element={<SignIn />}></Route>
            </Routes>
          </Router>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
