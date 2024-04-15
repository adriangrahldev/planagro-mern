"use client"
import { UserProvider } from "@/contexts/UserContext";

const SingleLayout = ({ children }: {children: React.ReactNode}) => {
    return (
        <UserProvider>

        <div className="flex items-center justify-center w-full h-full">
            {children}
        </div>
        </UserProvider>
    )
}
export default SingleLayout;