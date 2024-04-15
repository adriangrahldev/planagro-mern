import { useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { AuthContext } from "@/contexts/AuthContext";


export interface User {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    authToken: string;
}

export const useUser = () => {
    const {user, setUser} = useContext(AuthContext);
    const {setItem} = useLocalStorage();

    const addUser = (user: User) => {
        setUser(user);
        setItem("user", JSON.stringify(user));
    }

    const removeUser = () => {
        setUser(null);
        setItem("user", "");
    }

    return {user, addUser, removeUser, setUser};

}
