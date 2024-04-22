"use client";

import { registerAction } from "@/app/api/auth";
import Alert from "@/components/commons/alert";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, Fragment, useEffect, useState } from "react";

// 594A42
// A3C856

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const { user, setUser } = useUser();

  const [errors, setErrors] = useState([] as any);

  const router = useRouter();


  const [alerts, setAlerts] = useState([] as any);


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    registerAction({ fullName, email, password, confirmPassword })
      .then((data: any) => {
        const userObj = {
          _id: data.user._id,
          fullName: data.user.fullName,
          email: data.user.email,
          role: data.user.role,
          authToken: data.token
        }
        
        setUser(userObj);  
        router.push("/dashboard");
      })
      .catch((error: any) => {
        addAlert("error", error.response.data.message);
        setErrors(error.response.data.errors);
        console.log(errors);
        
      });
  };

  const addAlert = (type: string, message: string) => {
    setAlerts([...alerts, { type, message }]);
  };


  useEffect(() => {
    
    if(password === confirmPassword){
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  }, [password, confirmPassword]);

  return (
    <Fragment>
      <div className="absolute right-10 top-10 flex flex-col gap-2">
        {alerts.map((alert: any, index: number) => (
          <Alert
            key={index}
            message={`${alert.message}`}
            type={`${alert.type}`}
          />
        ))}
      </div>

      <div className="flex flex-col gap-10 items-center">
        <div id="logo" className="flex items-center gap-2 text-3xl">
          <Image src="/logo.png" alt="Plan Agro Logo" width={28} height={0} />
          <span>
            Plan<b>Agro</b>
          </span>
        </div>
        <form
          className="bg-[#f1e9e5] p-4 rounded-lg w-96 shadow-sm px-10"
          onSubmit={handleSubmit}
        >
          <div className="text-3xl font-semibold tracking-wider mb-4">
            Crear cuenta
          </div>

          <div className="flex flex-col mb-2 gap-1">
            <label htmlFor="fullName" className="font-semibold text-gray-500">
              Nombre completo
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Ej: Adrian Grahl"
              className="h-9 px-1 rounded-md border-[2px] border-[#dbd3cf]"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
			  required
            ></input>
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
			  required
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
			  required
            />
            {
              !isPasswordMatch && password.length > 0  && confirmPassword.length > 0  &&(
                <p className="text-green-500 text-sm">Las contraseñas coinciden</p>
              )
            }
            {
              errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )
            }
          </div>
          <div className="flex flex-col mb-4 gap-1">
            <label
              htmlFor="confirmPassword"
              className="font-semibold text-gray-500"
            >
              Confirmar contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Repite tu contraseña"
              className="h-9 px-1 rounded-md border-[2px] border-[#dbd3cf]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
			  required
            />
            {
              !isPasswordMatch && password.length > 0  && confirmPassword.length > 0  &&(
                <p className="text-green-500 text-sm">Las contraseñas coinciden</p>
              )
            }
          </div>
          <div className="flex justify-between items-center">
            <input
              type="submit"
              className="h-9 w-24 bg-[#594A42] text-white rounded-md border-0 hover:cursor-pointer"
              value={"Registrar"}
            />
            <Link href={"/user/login"} className="underline">
              Iniciar sesión
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
