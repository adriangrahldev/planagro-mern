"use client";
import { getRoleDisplay } from "@/contexts/user.data";
import { useUser } from "@/contexts/UserContext";

export function Header() {

  const {user} = useUser();

  return (
    <div className="w-full bg-gray-50  h-20 flex items-center justify-end px-4 rounded-tr-md rounded-br-md shadow-lg">
      {user && (
        <div className="flex items-center gap-2 px-4 py-1 bg-green-100 rounded-md shadow-sm">
          <div className="w-10 h-10 bg-white rounded-full border border-gray-400 flex items-center justify-center">
            {user.fullName?.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">{user.fullName}</span>
            <span className="text-sm">{getRoleDisplay(user.role)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
