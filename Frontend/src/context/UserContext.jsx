import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { enqueueSnackbar } from "notistack";
import axios from "../axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? { authenticatedUser: JSON.parse(savedUser) } : null;
  });

  const loginUser = (loggedInUserData) => {
    const { authenticatedUser } = loggedInUserData;
    const { password, token, ...UserSafeData } = authenticatedUser;
    setUser({ authenticatedUser: UserSafeData });

    localStorage.setItem("user", JSON.stringify(UserSafeData));
  };

  const logOutUser = async () => {
    try {
      const { data } = await axios.delete("/api/auth/user-logout");
      localStorage.removeItem("loginUser");
      setUser(null);
      enqueueSnackbar(data.msg, { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.msg, { variant: "success" });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logOutUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserContext = () => {
  return useContext(UserContext);
};
