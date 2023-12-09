import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';
import { redirect } from 'next/navigation';
import ChatForm from '../components/ChatForm';
import db from '../../../prisma/db';
import ChatMessage from '../components/ChatMessage';
import exp from 'constants';

async function getData() {
    const data = await db.message.findMany({
        select: {
            message: true,
            id: true,
            resident: {
                select: {
                    name: true
                }
            }
    },
    orderBy: {
        createdAt: 'asc'
    },
    take: 50,
    })
    return data;
}

export const dynamic = "force-dynamic";

const page = async () => {
    const session = await getServerSession(authOptions)
    const data = await getData()
    if (!session) {
        redirect('/login')
    }   

  return (
    <div className='h-screen bg-gray-200 flex flex-col'>
        <ChatMessage data={data as any}/>
        <ChatForm />
    </div>
    )
}

export default page