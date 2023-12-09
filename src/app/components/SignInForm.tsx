"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

const toastNotifySuccess = () =>
  toast.success("Sign-in success!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });

const SignInForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const SignInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (SignInData?.error) {
      console.log(SignInData.error);
      toast.error("Sign-in failed!");
    } else {
      toast.success("Sign-in success!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      router.push("/");
    }
  };

  return (
    <Form {...form}>
        <div className='flex justify-center'>
            <div className="card bg-gray-700 shadow-lg rounded-lg p-6 w-full max-w-sm mt-16 mb-16">
                <h1 className='text-3xl text-center text-bold text-white'>Sign Up</h1>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-sm mt-4'>
                    <div className="space-y-2">
                        <div className='mb-4'>
                            <label htmlFor='email' className='block text-sm font-medium text-neutral-content'>
                                Email
                            </label>
                            <input
                                type='text'
                                id='email'
                                placeholder='mail@example.com'
                                className='input input-bordered w-full max-w-xs py-1 px-2 rounded-md text-black'
                                {...form.register('email')}
                            />
                            <p className='text-red-500 text-xs mt-1'>{form.formState.errors.email?.message}</p>
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='password' className='block text-sm font-medium text-neutral-content'>
                                Password
                            </label>
                            <input
                                type='password'
                                id='password'
                                placeholder='Enter your password'
                                className='input input-bordered w-full max-w-xs py-1 px-2 rounded-md text-black'
                                {...form.register('password')}
                            />
                            <p className='text-red-500 text-xs mt-1'>{form.formState.errors.password?.message}</p>
                        </div>
                    </div>
                    <button className="btn btn-primary mt-6 hover:text-white w-full hover:underline bg-white hover:bg-black rounded-2xl py-3 text-black" type='submit'>
                        Sign In
                    </button>
                </form>
                <div
                    className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">or
                </div>
                <p className="text-center text-sm text-neutral-content">
                    Don&#39;t have an account yet? &#32;
                    <Link className="text-primary hover:underline" href="/pages/register">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    </Form>
  );
};

export default SignInForm;
