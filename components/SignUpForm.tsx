"use client";

import { userSignUp } from "@/actions/userSignUp";
import { FormInputType } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputType>();

  const onSubmit: SubmitHandler<FormInputType> = async (data) => {

    const loadingToast = toast.loading("Creating your account...");

    try {
      const response = await userSignUp(data);

      if (response.success) {
        toast.dismiss(loadingToast);
        toast.success(response.message)
      } else {
        toast.dismiss(loadingToast);
        toast.error(response.message);
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="flex flex-col border-2" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        placeholder="Smith Rock"
        {...register("name", { required: true })}
      />
      {errors.name && <span>This field is required</span>}

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
  );
}
