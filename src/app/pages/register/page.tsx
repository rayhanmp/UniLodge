import React from 'react'
import SignUpForm from '@/app/components/SignUpForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const SignUp = async() => {
  const session = await getServerSession(authOptions)
  console.log(session)
  if (session) {
    return (
      <div className='flex items-center justify-center h-screen'>
      <p className='text-3xl text-white font-bold'>You are already logged in</p>
    </div>
      )
  }

  return (
    <SignUpForm/>
  )
}

export default SignUp
