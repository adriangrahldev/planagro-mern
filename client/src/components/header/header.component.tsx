"use client";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";

export function Header() {

  const {user} = useUser();

  return (
    <div className="w-full bg-[#e9e8e8] h-20 flex items-center justify-end px-4 rounded-tr-md rounded-br-md">
      {user && (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#c4c4c4] rounded-full border border-black flex items-center justify-center p-2">
            {user.fullName?.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">{user.fullName}</span>
            <span className="text-sm">{user.role}</span>
          </div>
        </div>
      )}
    </div>
  );
}
