"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StoreContext } from "../../../../../store/StoreProvider";
import { loginWithEmailPassword } from "@/services/authServices";
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const context: any = useContext(StoreContext);
  const { setAuthNormal, setAuthAdmin } = context;

  const [incorrect, setIncorrect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const checkUser = async (data: any) => {
    const loginRespose = await loginWithEmailPassword(data.email, data.password);
    if (
      data.email === "cafeteria@upb.seupb.com" &&
      loginRespose.success
    ) {
      setAuthAdmin(true);
      router.push("/admin/cafeteria");
    } else if (
      data.email === "evento@upb.com" &&
      loginRespose.success
    ) {
      setAuthAdmin(true);
      router.push("/admin/events");
    } else {
      setAuthAdmin(false);
      setIncorrect(true);
    }
  };
  const click = () => {
    setAuthNormal(true);
    router.push("/home/cafeteria");
  }

  useEffect(() => {
    setAuthAdmin(false);
    setAuthNormal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col bg-white min-[319px]:p-4 md:p-10 rounded-lg space-y-4 md:space-y-6 h-full w-full">
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(checkUser)}
      >
        <div className="flex  flex-col">
          <div className="mb-2 block">
            <label className="text-[#302E46] font-semibold text-xl font-jost">
              Correo Electrónico
            </label>
          </div>
          <input
            className=" bg-white text-gray-800 rounded-lg font-josefin font-light"
            placeholder="usuario@email.com"
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-700 mt-2 font-normal font-jost">
              * Debes introducir un correo
            </p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="text-red-700 mt-2 font-normal font-jost">
              * Introduce un correo válido
            </p>
          )}
        </div>
        <div className="flex  flex-col">
          <div className="mb-2 block">
            <label className="text-[#302E46] font-semibold font-jost text-xl">
              Contraseña
            </label>
          </div>
          <div className="relative">
            <input
              className="bg-white text-gray-800 rounded-lg font-josefin font-light w-full"
              placeholder="°°°°°°°°"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true, minLength: 8 })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password?.type === "required" && (
            <p className="text-red-700 mt-2 font-normal leading-relaxed font-jost ">
              * Debes introducir una contraseña
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-700 mt-2 font-normal leading-relaxed font-jost">
              * Una contraseña debe tener al menos 8 caracteres
            </p>
          )}
        </div>
        {incorrect && (
          <p className="text-red-700 mt-2 font-normal leading-relaxed font-jost">
            * El correo y la contraseña son incorrectos, introdúcelos de nuevo
          </p>
        )}
        <button type="submit" className=" bg-[#63CCC5] hover:bg-green-700 p-2 rounded-xl text-white font-medium mt-5">Ingresar</button>
      </form>
      <button onClick={click} className=" bg-[#63CCC5] hover:bg-green-500 p-2 rounded-xl text-white font-medium">Ingresar como estudiante</button>

    </div>
  );
};

export default LoginForm;