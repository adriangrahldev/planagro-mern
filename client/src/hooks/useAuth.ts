import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";

export const useAuth = () => {

    const {user, addUser, removeUser, setUser} = useUser();
    const {getItem} = useLocalStorage();

    useEffect(() => {
        const user = getItem("user");
        if(user){
            setUser(JSON.parse(user));
        }
    }, [getItem, setUser]);

    const login = (user: any) => {
        addUser(user);
    }

    const logout = () => {
        removeUser();
    }

    return {user, login, logout, setUser};
}