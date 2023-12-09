'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Pusher from 'pusher-js';

interface appProps {
    data: {
        resident: {
            name: string | null;
        };
        message: string;
    }[];
}

export default function ChatMessage({ data }: appProps) {
    const [totalMessages, setTotalMessages] = useState(data);
    const { data: session } = useSession();
    const messageEndRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
            cluster: 'ap1'
        });

        const channel = pusher.subscribe('chat');
        const handleNewMessage = (data: any) => {
            const parsedMessages = JSON.parse(data.message);

            // Check if the new message is not already present in totalMessages
            const isUnique = !totalMessages.some((msg) => msg.message === parsedMessages.message);

            if (isUnique) {
                setTotalMessages((prev) => [...prev, parsedMessages]);
            }
        };

        channel.bind('unilodge', handleNewMessage);

        return () => {
            // Cleanup: Unsubscribe from Pusher when the component is unmounted
            channel.unbind('unilodge', handleNewMessage);
            pusher.unsubscribe('chat');
        };
    }, [totalMessages]);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        scrollToBottom();
    }, [totalMessages]);

    return (
        <div className="p-6 flex-grow max-h-screen overflow-y-auto py-32">
            <div className="flex flex-col gap-4">
                {totalMessages.map((message, index) => (
                    <div key={index} className={`flex items-center ${message.resident.name === session?.user.name ? 'justify-end' : 'justify-start'}`}>
                        {message.resident.name !== session?.user.name && (
                            <div className="flex flex-col items-center">
                                <Image
                                    src="/profile_default.webp"
                                    alt="Default Profile Picture"
                                    className="w-12 h-12 object-cover rounded-full mb-1"
                                    width={50}
                                    height={50}
                                />
                                <p className="font-light text-sm text-gray-600">
                                    {message.resident.name}
                                </p>
                            </div>
                        )}

                        <div className={`rounded-lg ml-5 p-4 shadow-md self-start text-black ${message.resident.name === session?.user.name ? 'bg-yellow-300' : 'bg-white'}`}>
                            {message.message}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
