"use client"

import qs from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Video, VideoOff } from "lucide-react"
import { ActionTooltip } from "@/app/components/action-tooltip"

export const ChatVideoButton = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const isVideo = searchParams?.get("video")

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo ? undefined : true,
            }
        }, { skipNull: true })

        router.push(url)
    }

    const VideoIcon = isVideo ? VideoOff : Video
    const VideoTooltipLabel = isVideo ? "End video call" : "Start video call"

    return (
            <ActionTooltip side="bottom" label={VideoTooltipLabel}>
                <button onClick={onClick} className="hover:opacity-75 transition mr-6">
                    <VideoIcon className="h-6 w-6 text-emerald-500" />
                </button>
            </ActionTooltip>
    )
}