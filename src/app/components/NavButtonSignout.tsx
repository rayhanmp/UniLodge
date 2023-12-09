"use client"

import {signOut} from "next-auth/react"

const NavButtonSignout = () => {
    return (
        <button
            type="button"
            onClick={() => signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/pages/login`
            })}
            className="mx-2 rounded-full border border-black bg-indigo-500 py-2.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
        >
            Sign Out
        </button>
    )
}

export default NavButtonSignout