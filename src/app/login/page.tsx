"use client"

import { SignIn } from "@/lib/service/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa6";

type LoginFormData = {
  email: string;
  password: string;
};

type LoginError = string | null;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  if (errors) {
    console.log("errors:", errors);
  }

  const [error, setError] = useState<LoginError>(null);
  const router = useRouter();
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    setIsLoadingButton(true)
    const { email, password } = data;

    const result = await SignIn(email, password);

    if (result.success) {
      if (result.token) {
        localStorage.setItem('constructpro_token', result.token);
      }
      setError(null);
      router.push("/dashboard");
    } else {
      setError(result.message ?? null);
      setIsLoadingButton(false)
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Image src={"/images/pic (4).webp"} alt="Login" width={1000} height={1000} className="absolute -z-10 w-full h-full object-cover" />
      <div className="absolute h-full w-full bg-neutral/75 -z-10"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-base-100 w-full md:w-4/12 p-10">
        <h1 className="font-semibold text-2xl text-center mb-5">Login</h1>
        <hr className="mb-5"/>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">Email:</legend>
          <label className="input validator w-full">
            <FaEnvelope />
            <input 
              type="email" 
              placeholder="youremail@mail.com" 
              required
              {...register("email", { required: "Email is required." })} 
            />
          </label>
          <div className="validator-hint hidden">Please enter a valid email address</div>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">Password:</legend>
          <label className="input validator w-full">
            <FaEnvelope />
            <input 
              type="password" 
              placeholder="youremail@mail.com" 
              required
              {...register("password", { required: "Password is required." })} 
            />
          </label>
          <div className="validator-hint hidden">Please enter password</div>
        </fieldset>
        {error && <p className="text-error text-center">{error}</p>}
        <button type="submit" className="btn btn-primary text-lg mt-5 w-full">{isLoadingButton ? "Login....." : "Login"}</button>
        <p className="font-semibold mt-5">For demo purposes use the following credentials:</p>
        <ul className="list-disc list-inside">
          <li>Email: admin@constructpro.vercel.app</li>
          <li>Password: Password@123</li>
        </ul>
      </form>
    </div>
  )
}

export default Login