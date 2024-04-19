"use client"
import { useUser } from "@/contexts/UserContext";
import {
  HomeIcon,
  MapIcon,
  ListBulletIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const routes = [
  {
    name: "Inicio",
    icon: HomeIcon,
    path: "/dashboard",
    activators: [
      "/dashboard",
    ]
  },
  {
    name: "Campos",
    icon: MapIcon,
    path: "/dashboard/fields/",
    activators: [
      "/fields",
      "/fields/create",
      "/fields/[id]",
      "/fields/[id]]/edit",
    ]
  },
  {
    name: "Actividades",
    icon: ListBulletIcon,
    path: "/dashboard/activities",
    activators: [
      "/activities",
      "/activities/create",
      "/activities/[id]",
      "/activities/[id]]/edit",
    ]
  },
];

export function Sidebar() {
  const router = useRouter();
  const currentPath = usePathname();

  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    router.push("/user/login");
  };

  useEffect(() => {
    console.log(currentPath);
  }, [currentPath]);

  return (
    <div className="w-56 bg-green-600 rounded-tl-md rounded-bl-md shadow-lg flex flex-col">
      <div
        id="logo"
        className="flex items-center justify-center gap-2 text-xl px-2 mt-6 mb-10"
      >
        <Image src="/logo.png" alt="Plan Agro Logo" width={25} height={0} />
        <span>
          Plan<b>Agro</b>
        </span>
      </div>
      <div className="flex-1 flex flex-col">
        <div>
          <ul className="flex flex-col gap-2 px-4">
            {routes.map((route, index) => (
              <li key={index}>
                <Link
                  href={route.path}
                  className={`flex text-white items-center gap-2 p-2 rounded-md hover:bg-green-200 hover:text-green-800 ${
                    route.activators.find((activator) =>
                      currentPath.replace('/dashboard','').includes(activator) || currentPath === route.activators[0]
                    )
                      ? "bg-green-200 text-green-800"
                      : ""
                  }`}
                >
                  <route.icon width={24} />
                  <span>{route.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 flex items-end justify-center py-4">
          <button
            className="rounded-md hover:bg-white hover:shadow-lg p-2"
            onClick={() => handleLogout()}
          >
            <Link
              href="/logout"
              className="flex gap-2 bg-green-300 px-2 py-1 rounded-md text-red-600"
            >
              <ArrowLeftEndOnRectangleIcon width={24} />
              <span>Cerrar Sesión</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
