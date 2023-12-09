"use client"
import Link from "next/link";
import Image from "next/image";
import {useSession} from "next-auth/react"
import NavButtonSignout from "@/app/components/NavButtonSignout"
import {FaHome} from "react-icons/fa";

const Navbar = () => {
    const {data: session} = useSession();

    return (
        <nav className="flex flex-between w-full pt-4 justify-between px-20 mt-10 mb-16">
            <Link href="/" className="flex gap-4 flex-center">
                <FaHome size={30}/>
                <p className="mt-2">UniLodge</p>
            </Link>

            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex flex-between gap-4 md:gap-8">
                        {/**Search Bar */}
                        {/*<input*/}
                        {/*    type="text"*/}
                        {/*    placeholder="Search for a football field"*/}
                        {/*    className="search_input peer"*/}
                        {/*    // todo implement functioning search bar*/}
                        {/*/>*/}
                        <Link href="/pages/complaint" className="hover:underline mt-2">File complaint</Link>
                        <Link href="/pages/foodmenu" className="hover:underline mt-2">Food</Link>
                        <Link href="/pages/laundry" className="hover:underline mt-2">Laundry</Link>
                        <Link href="/pages/otherservices" className="hover:underline mt-2">Others</Link>
                        <Link href="/chat" className="hover:underline mt-2">Chat App</Link>
                        {session?.user.role === "admin" && (
                            <Link href="/" className="hover:underline mt-2">Complaints</Link>
                        )}

                        <NavButtonSignout/>

                        <Link href="/">
                            <Image
                                alt="Profile" src="/profile_default.webp"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (	// else
                    // todo ganti ke sign in sama register option beneran
                    <div className="flex flex-between gap-4 md:gap-4">
                        <Link href="/pages/register"
                              className="mx-4 bg-white rounded-full bg-transparent py-2.5 px-5 text-black transition-all hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center">
                            Register
                        </Link>
                        <Link href="/pages/login"
                              className="mr-4 rounded-full bg-blue-500 py-2.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center">
                            Sign In
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar