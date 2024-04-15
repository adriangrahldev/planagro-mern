"use client";

import { useUser } from "@/contexts/UserContext";
import {
  HomeIcon,
  MapIcon,
  ListBulletIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const routes = [
  {
    name: "Inicio",
    icon: HomeIcon,
    path: "/dashboard",
  },
  {
    name: "Campos",
    icon: MapIcon,
    path: "/dashboard/fields",
  },
  {
    name: "Actividades",
    icon: ListBulletIcon,
    path: "/dsahboard/activities",
  },
];
export function Sidebar() {
  
  const router = useRouter();
  const [pathname, setPathname] = useState("/");
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    router.push("/user/login");
  };

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);
  return (
    <div className="w-56 bg-[#e9e8e8] rounded-tl-md rounded-bl-md shadow-md flex flex-col">
      <div
        id="logo"
        className="flex items-center justify-center gap-2 text-xl px-2 pt-4 mb-10"
      >
        <Image src="/logo.png" alt="Plan Agro Logo" width={20} height={0} />
        <span>
          Plan<b>Agro</b>
        </span>
      </div>
      <div className="flex-1 flex flex-col">
        <div>
          <ul className="flex flex-col gap-2 px-4">
            {routes.map((route, index) => (
              <li
                key={index}
                className={`p-2 rounded-md ${
                  pathname === route.path
                    ? "bg-[#cfc6c6] font-semibold shadow"
                    : "hover:bg-[#ddd6d6]"
                } `}
              >
                <Link href={route.path} className="flex gap-2">
                  <route.icon width={24} />
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 flex items-end justify-center py-4">
          <button
            className="rounded-md hover:bg-[#cfc6c6] p-2"
            onClick={() => handleLogout()}
          >
            <Link href="/logout" className="flex gap-2">
              <ArrowLeftEndOnRectangleIcon width={24} />
              <span>Cerrar Sesión</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
