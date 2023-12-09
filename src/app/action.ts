'use server';
import { v4 as uuidv4 } from 'uuid';

import { getServerSession } from "next-auth";
import db from "../../prisma/db";
import { authOptions } from "@/lib/auth";

export async function postData(formData: FormData) {
    "use server";
    const Pusher = require("pusher");

    const message = formData.get('message');

    const session = await getServerSession(authOptions);

    const data = await db.message.create({
        data: {
            message: message as string,
            residentId: session?.user?.id,
            id: uuidv4()
        },
        include: {
            resident: {
                select: {
                    name: true,
            }
        }
}});
    const pusher = new Pusher({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.NEXT_PUBLIC_PUSHER_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: 'ap1',
        useTLS: true,
    })

    pusher.trigger('chat', 'unilodge', {
        message: `${JSON.stringify(data)}\n\n`
    });
}