"use client";

import { FormInputType } from "@/types";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputType>();

  const onSubmit: SubmitHandler<FormInputType> = async (data) => {

    const loadingToast = toast.loading("Logging You In...");

    try {

      const response = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email: data.email,
        password: data.password,
      })

      if (response?.ok) {
        toast.dismiss(loadingToast);
        toast.success("Logged In Successfully")
      } else {
        toast.dismiss(loadingToast);
        toast.error("Something went wrong");
      }

    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred")
    }
  }

  return (
    <>

      <form className="flex flex-col border-2" onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="smithrocky@gmail.com"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
      <button onClick={() => signIn("google")}>
        Sign In with Google
      </button>
      <button onClick={() => signIn("github")}>
        Sign In with Github
      </button>
    </>
  );
}
