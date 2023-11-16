"use client"

import qs from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Phone, PhoneOff } from "lucide-react"
import { ActionTooltip } from "@/app/components/action-tooltip"

export const ChatAudioButton = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const isAudio = searchParams?.get("audio")

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname || "",
            query: {
                audio: isAudio ? undefined : true
            }
        }, { skipNull: true })

        router.push(url)
    }

    const AudioIcon = isAudio ? PhoneOff : Phone
    const AudioTooltipLabel = isAudio ? "End voice call" : "Start voice call"

    return (
            <ActionTooltip side="bottom" label={AudioTooltipLabel}>
                <button onClick={onClick} className="hover:opacity-75 transition mr-5">
                    <AudioIcon className="h-5 w-5 text-emerald-500" />
                </button>
            </ActionTooltip>
    )
}