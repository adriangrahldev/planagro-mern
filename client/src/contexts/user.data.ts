export interface User {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    authToken: string;
}


export const getRoleDisplay = (role: string) => {
    return role === "admin" ? "Administrador" : "Gerente";
}