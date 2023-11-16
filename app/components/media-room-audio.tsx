"use client"

import { useEffect, useState } from "react"
import { LiveKitRoom, AudioConference } from "@livekit/components-react"
import "@livekit/components-styles"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"

interface MediaRoomAudioProps {
    chatId: string
    video: boolean
    audio: boolean
}

export const MediaRoomAudio = ({
    chatId,
    video,
    audio
} : MediaRoomAudioProps) => {
    const session = useSession()
    const [token, setToken] = useState("")

    useEffect(() => {
        if(!session?.data?.user?.name) return ;

        const name = `${session.data.user.name}`;

        (async () => {
            try {
                const response = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
                const data = await response.json()
                setToken(data.token)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [session?.data?.user?.name, chatId])

    if (token === "") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500">Loading...</p>
            </div>
        )
    }

    return (
        <LiveKitRoom data-lk-theme="default" serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} token={token} connect={true} video={video} audio={audio}>
            <AudioConference />
        </LiveKitRoom>
    )
}