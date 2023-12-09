'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    name: z.string().min(1, "Name must not be empty"),
    phone: z.string().min(1, "Phone must not be empty"),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

const SignUpForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      name: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const {confirmPassword, ...data} = values;

    const response = await fetch('/api/residents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        name: data.name,
        phone: data.phone,
        password: data.password
      })
    })

    const resp: { user?: any; message?: string } = await response.json();

    if (resp.message == "This email has been used by other user") {
      toast.error('This email has been used by another user.');
    }

    if (resp.message == "This username has been used by other user") {
      toast.error('This username has been used by other user.');
    }

    console.log(resp.message);
    if (response.ok) {
      toast.success('Registration success!');
      router.push('/login')
    }
    else {
      if (resp.message !== "This username has been used by other user" && resp.message !== "This email has been used by other user") {
        toast.error('Registration failed!');
        console.error('Registration failed')
    }
  }
}

  return (
    <div className='flex justify-center'>
      <div className="card bg-neutral shadow-lg rounded-lg p-6 w-full max-w-sm mt-16 mb-16"> 
        <h1 className='text-3xl text-center text-bold text-white'>Sign Up</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-sm mt-4'>
          <div className="space-y-2">
            <div className='mb-3'>
            <label htmlFor='username' className='block text-sm font-medium text-neutral-content'>
              Username
            </label>
            <input
              type='text'
              id='username'
              placeholder='johndoe'
              className='input input-bordered w-full max-w-xs'
              {...form.register('username')}
            />
            <p className='text-red-500 text-xs mt-1'>{form.formState.errors.username?.message}</p>
          </div>

          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-neutral-content'>
              Email
            </label>
            <input
              type='text'
              id='email'
              placeholder='mail@example.com'
              className='input input-bordered w-full max-w-xs'
              {...form.register('email')}
            />
            <p className='text-red-500 text-xs mt-1'>{form.formState.errors.email?.message}</p>
          </div>

          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-neutral-content'>
              Name
            </label>
            <input
              type='text'
              id='name'
              placeholder='Enter your name'
              className='input input-bordered w-full max-w-xs'
              {...form.register('name')}
            />
            <p className='text-red-500 text-xs mt-1'>{form.formState.errors.name?.message}</p>

          </div>

          <div className='mb-4'>
            <label htmlFor='phone' className='block text-sm font-medium text-neutral-content'>
              Phone
            </label>
            <input
              type='text'
              id='phone'
              placeholder='Enter your phone'
              className='input input-bordered w-full max-w-xs'
              {...form.register('phone')}
            />
            <p className='text-red-500 text-xs mt-1'>{form.formState.errors.phone?.message}</p>
          </div>

          <div className='mb-4'>
            <label htmlFor='password' className='block text-sm font-medium text-neutral-content'>
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='Enter your password'
              className='input input-bordered w-full max-w-xs'
              {...form.register('password')}
            />
            <p className='text-red-500 text-xs mt-1'>{form.formState.errors.password?.message}</p>
          </div>

          <div className='mb-4'>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-neutral-content'>
              Re-Enter your password
            </label>
            <input
              type='password'
              id='confirmPassword'
              placeholder='Re-Enter your password'
              className='input input-bordered w-full max-w-xs'
              {...form.register('confirmPassword')}
            />
            <p className='text-red-500 text-xs mt-1'>{form.formState.errors.confirmPassword?.message}</p>
          </div>
          </div>
          <button className="btn btn-primary mt-6 text-white w-full" type='submit'>
            Sign up
          </button>
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">or</div>
        <p className="text-center text-sm text-neutral-content">
          If you already have an account, please&nbsp;
          <Link className="text-primary hover:underline" href="/sign-in">
          Sign in
        </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
