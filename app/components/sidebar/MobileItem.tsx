"use client"

import Link from "next/link";
import { cn } from "@/libs/utils";

interface MobileItemProps {
    href: string
    icon: any
    active?: boolean
    onClick?: () => void
}

const MobileItem = ({
    href,
    icon: Icon,
    active,
    onClick
} : MobileItemProps) => {
    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }

    return (
        <Link href={href} onClick={onClick} className={cn(`
            group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-emerald-500 transition hover:bg-gray-100
        `,
            active && "bg-gray-100 text-emerald-500"
        )}>
            <Icon className="h-6 w-6" />
        </Link>
    )
}
 
export default MobileItem;