"use client";
import { getRoleDisplay } from "@/contexts/user.data";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";

export function Header() {

  const {user} = useUser();

  return (
    <div className="w-full bg-[#e9e8e8] h-20 flex items-center justify-end px-4 rounded-tr-md rounded-br-md">
      {user && (
        <div className="flex items-center gap-2 px-4 py-1 bg-[#facaca] rounded-md">
          <div className="w-10 h-10 bg-[#c4c4c4] rounded-full border border-black flex items-center justify-center">
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
