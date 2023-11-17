"use client"

import { useEffect, useState } from "react"
import {
    LiveKitRoom,
    GridLayout,
    ParticipantTile,
    useTracks,
    RoomAudioRenderer,
    ControlBar,
} from '@livekit/components-react';
import "@livekit/components-styles"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { Track } from "livekit-client";

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
        <LiveKitRoom
          video={video}
          audio={audio}
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          connect={true}
          data-lk-theme="default"
          style={{ height: '93%' }}
        >
          {/* Your custom component with basic video conferencing functionality. */}
          <MyVideoConference />
          {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
          <RoomAudioRenderer />
          {/* Controls for the user to start/stop audio, video, and screen 
          share tracks and to leave the room. */}
          <ControlBar />
        </LiveKitRoom>
      );
}

function MyVideoConference() {
    // `useTracks` returns all camera and screen share tracks. If a user
    // joins without a published camera track, a placeholder track is returned.
    const tracks = useTracks(
      [
        { source: Track.Source.Camera, withPlaceholder: true },
        { source: Track.Source.ScreenShare, withPlaceholder: false },
      ],
      { onlySubscribed: false },
    );
    return (
      <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
        {/* The GridLayout accepts zero or one child. The child is used
        as a template to render all passed in tracks. */}
        <ParticipantTile />
      </GridLayout>
    );
  }