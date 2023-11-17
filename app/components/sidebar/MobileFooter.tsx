"use client"

import useConversation from "@/app/hooks/useConversation"
import useRoutes from "@/app/hooks/useRoutes"
import MobileItem from "./MobileItem"
import Avatar from "../Avatar"
import { User } from "@prisma/client"
import { useState } from "react"
import SettingsModal from "./SettingsModal"
import { usePathname } from "next/navigation"

interface MobileFooterProps {
    currentUser: User
}

const MobileFooter = ({
    currentUser
} : MobileFooterProps) => {
    const pathname = usePathname() || ""
    const routes = useRoutes()
    const [isOpen, setIsOpen] = useState(false)
    const { conversationId } = useConversation()

    const hideFooterRoutes = [`/conversations/${conversationId}`]
    const showFooter = !hideFooterRoutes.includes(pathname)

    if (!showFooter) {
        return null
    }

    return (
        <>
            <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
                {routes.map((route) => (
                    <MobileItem key={route.label} href={route.href} active={route.active} icon={route.icon} onClick={route.onClick} />
                ))}
                    <div onClick={() => setIsOpen(true)} className="cursor-pointer mt-2 me-5 hover:opacity-75 transition">
                        <Avatar user={currentUser} />
                    </div>
            </div>
        </>
    )
}

export default MobileFooter