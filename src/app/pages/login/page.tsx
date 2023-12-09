'use client'
import React, { useEffect } from 'react'
import SignInForm from '@/app/components/SignInForm'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from 'next-auth/react'

const Page = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <div className='flex items-center justify-center h-screen'>
      <p className='text-3xl text-white font-bold'>You are already logged in</p>
    </div>
      )
  }
  return (
    <div>
      <SignInForm />
      <ToastContainer />
    </div>
  );
}

export default Page;