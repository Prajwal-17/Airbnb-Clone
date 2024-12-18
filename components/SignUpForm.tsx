"use client";

import { userSignUp } from "@/actions/userSignUp";
import { FormInputType } from "@/types";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export default function SignUpForm() {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputType>();

  const onSubmit: SubmitHandler<FormInputType> = async (data) => {

    setLoading(true);
    const loadingToast = toast.loading("Creating your account...");

    try {
      const response = await userSignUp(data);

      if (response.success) {
        toast.dismiss(loadingToast);
        toast.success(response.message);
        setLoading(false)
        router.push("/")
      } else {
        toast.dismiss(loadingToast);
        toast.error(response.message);
        setLoading(false)
      }

    } catch (error) {
      if (error) {
        toast.error("Something went wrong")
      }
    }
  }

  return (
    <>
      <form className="font-medium flex flex-col gap-4 mt-4 py-3 mb-3 border-b-2" onSubmit={handleSubmit(onSubmit)}>

        <div className="">
          <label className="text-xl leading-10" htmlFor="name">Name</label>
          <input
            className="w-full border-2 px-2 py-2 rounded-xl"
            type="text"
            placeholder="Smith Rock"
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
        </div>

        <div>
          <label className="text-xl leading-10" htmlFor="email">Email</label>
          <input
            className="w-full border-2 px-2 py-2 rounded-xl"
            type="email"
            placeholder="smithrocky@gmail.com"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>

        <div>
          <label className="text-xl leading-10" htmlFor="password">Password</label>
          <input
            className="w-full border-2 px-2 py-2 rounded-xl"
            placeholder="•••••••••••••"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}

        </div>

        <button disabled={loading} className={`w-full bg-rose-500 text-white py-3 text-lg rounded-lg font-medium hover:bg-rose-400 ${loading ? "cursor-not-allowed opacity-40" : ""} `} type="submit">SignUp</button>
      </form>
      <div className="flex flex-col font-medium gap-3">
        <div
          onClick={() => signIn("google")}
          className={`flex justify-start items-center border-2 border-black py-3 rounded-lg hover:opacity-70 ${loading ? "cursor-not-allowed opacity-40" : ""} `}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" className="absolute mx-4" y="0px" width="22" height="22" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <button
            disabled={loading}
            className="w-full text-center">
            Continue with Google
          </button>
        </div>

        <div>
          <div
            onClick={() => signIn("github")}
            className={`flex justify-start items-center border-2 border-black py-3 rounded-lg hover:opacity-70 ${loading ? "cursor-not-allowed opacity-40" : ""} `}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="absolute mx-4" width="23" height="23" viewBox="0 0 32 32">
              <path fillRule="evenodd" d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z"></path>
            </svg>
            <button
              // disabled={loadingTotat}
              className="w-full text-center">
              Continue with Github
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <div className="text-gray-500">Already have an account?</div>
          <div className="hover:underline"><Link href={"/auth/login"}>Log In</Link></div>
        </div>

      </div>
    </>
  );
}
