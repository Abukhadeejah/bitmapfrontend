
import { useState, createContext, useContext, Children } from "react";
import ReactDOM from "react-dom/client";

const UserContext = createContext();

export const Context = ({ children }) => {
    const [user, setUser] = useState("Jesse Hall");

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}