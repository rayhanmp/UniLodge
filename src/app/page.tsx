"use client";
import {useSession} from 'next-auth/react'
import {FaFileWaveform} from "react-icons/fa6";
import {MdOutlineHomeRepairService, MdOutlineLocalLaundryService} from "react-icons/md";
import {IoChatboxEllipsesOutline, IoFastFoodOutline} from "react-icons/io5";
import Link from "next/link";
import React from "react";

export default function Home() {
    const services = [
        {
            id: 1,
            name: 'File a complaint',
            icon: FaFileWaveform,
            link: '/pages/complaint'
        },
        {
            id: 2,
            name: 'Laundry',
            icon: MdOutlineLocalLaundryService,
            link: '/pages/laundry'
        },
        {
            id: 3,
            name: 'Food',
            icon: IoFastFoodOutline,
            link: '/pages/foodmenu'
        },
        {
            id: 4,
            name: 'Other Services',
            icon: MdOutlineHomeRepairService,
            link: '/pages/otherservices'

        },
        {
            id: 5,
            name: 'Chat App',
            icon: IoChatboxEllipsesOutline,
            link: '/pages/chatapp'
        }
    ]

    const {data: session} = useSession();
    return (
        <div className="flex flex-col max-w-full items-center mx-auto w-full flex-start">
            <>
                {session?.user ? (
                    <>
                        <h1 className="text-left text-white pb-4">
                            Welcome, {session?.user.username}
                            <br/>
                        </h1>
                        <h2 className="text-orange-300 text-left">
                            What would you like to call?
                        </h2>
                    </>
                ) : (
                    <>
                        <h1 className="text-white text-left blue_gradient">
                            Welcome to UniLodge
                        </h1>
                        <h2 className="text-orange-300 headline_subtext text-left">
                            Sign In to access your profile and the services
                        </h2>
                    </>
                )}
            </>
            {/*<div className={"grid grid-cols-3"}>*/}
            {/*    {services.map(service => (*/}
            {/*        <Link key={service.id} href={`${service.link}`} className={"bg-gray-800 text-white flex" +*/}
            {/*            " flex-col"}>*/}
            {/*            <h1 className={}>{service.name}</h1>*/}
            {/*        </Link>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    )
}