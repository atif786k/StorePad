import "./App.css";
import SignIn from "./auth/SignIn";
import Login from "./auth/Login";
import MainFrame from "./utils/MainFrame";
import axios from "axios";

function App() {
  const handleLogOut = async () => {
    try {
      const response = await axios.get('/auth/logout');
      console.log('Logout response:', response);
      // Handle post-logout logic, like redirecting to the login page
  } catch (error) {
      console.error('Logout failed:', error);
  }
  }
  return (
    <>
      <div className="app-container">
        {/* <MainFrame /> */}
        <SignIn/>
        <Login/>
        <button onClick={handleLogOut}>LogOut</button>
      </div>
    </>
  );
}

export default App;
