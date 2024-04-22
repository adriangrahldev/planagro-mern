"use client";

import { loginAction } from "@/app/api/auth";
import Alert from "@/components/commons/alert";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, Fragment, useState } from "react";

// 594A42
// A3C856

export default function LoginPage() {

  const { user, setUser } = useUser();

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();
 
  const [alerts, setAlerts] = useState([] as any);


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
   
    loginAction({email,password}).then((data:any) => {
      const userObj = {
        _id: data.user._id,
        fullName: data.user.fullName,
        email: data.user.email,
        role: data.user.role,
        authToken: data.token
      }
      
      setUser(userObj);  
      router.push('/dashboard');
    }).catch((error:any) => {
      localStorage.clear();
      addAlert('error', error.response.data.message);
    });
  };

  const addAlert = (type: string, message: string) => {
    setAlerts([...alerts, { type, message }]);
  }

  return (
    <Fragment>
      <div className="absolute right-10 top-10 flex flex-col gap-2">
        {alerts.map((alert: any, index:number) => (
          <Alert key={index} message={`${alert.message}`} type={`${alert.type}`} />
        ))}
      </div>

      <div className="flex flex-col gap-6 items-center">
        <div id="logo" className="flex items-center gap-2 text-3xl">
          <Image src="/logo.png" alt="Plan Agro Logo" width={28} height={0} />
          <span>
            Plan<b>Agro</b>
          </span>
        </div>
        <form className="bg-[#f1e9e5] p-4 rounded-lg w-72 shadow-sm" onSubmit={handleSubmit}>
          <div className="text-3xl font-semibold tracking-wider mb-4">
            Iniciar sesión
          </div>

          <div className="flex flex-col mb-2 gap-1">
            <label htmlFor="email" className="font-semibold text-gray-500">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ej: adriangrahl@gmail.com"
              className="h-9 px-1 rounded-md border-[2px] border-[#dbd3cf]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4 gap-1">
            <label htmlFor="password" className="font-semibold text-gray-500">
              Contaseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Tu contraseña"
              className="h-9 px-1 rounded-md border-[2px] border-[#dbd3cf]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <input
              type="submit"
              className="h-9 w-24 bg-[#594A42] text-white rounded-md border-0 hover:cursor-pointer"
              value={"Ingresar"}
            />
            <Link href={"/user/register"} className="underline">
              Crear cuenta
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
