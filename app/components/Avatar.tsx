"use client"

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
    user?: User
}

const Avatar = ({
    user
} : AvatarProps) => {
    const { members } = useActiveList()
    const isActive = members.indexOf(user?.email!) !== -1


    return (
        <div className="relative">
            <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-10 md:w-10">
                <Image alt="Avatar" className="bg-white" src={user?.image || '/images/placeholder.png'} fill />
            </div>
            {isActive && (
                <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:w-3 md:h-3" />
            )}
        </div>
    )
}
 
export default Avatar;