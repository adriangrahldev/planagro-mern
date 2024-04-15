import React, { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";

export const useAuth = () => {
    const { user, addUser, removeUser, setUser } = useUser();
    const { getItem } = useLocalStorage();

    useEffect(() => {
        const user = getItem("user");
        if (user) {
            try {
                setUser(JSON.parse(user));
            } catch (error) {
                console.error("Error parsing user data from local storage:", error);
            }
        }
    }, [getItem, setUser]);

    const login = (user: any) => {
        addUser(user);
    };

    const logout = () => {
        removeUser();
    };

    return { user, login, logout, setUser };
};
