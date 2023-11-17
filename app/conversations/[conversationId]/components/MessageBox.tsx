"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import { cn } from "@/libs/utils";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { Image } from "next/dist/client/image-component";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox = ({ data, isLast }: MessageBoxProps) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = cn("flex gap-3 p-4", isOwn && "justify-end");

  const avatar = cn(isOwn && "order-2");

  const body = cn("flex flex-col gap-2", isOwn && "items-end");

  const message = cn(
    "text-md w-fit overflow-hidden",
    isOwn
      ? "bg-emerald-500 text-white px-3 py-2 rounded-bl-lg rounded-tl-lg rounded-br-lg"
      : "bg-emerald-600 text-white px-3 py-2 rounded-br-lg rounded-tr-lg rounded-bl-lg",
    isOwn &&
      data.image &&
      "bg-emerald-500 rounded-bl-lg rounded-tl-lg rounded-br-lg p-2",
    !isOwn &&
      data.image &&
      "bg-emerald-600 rounded-br-lg rounded-tr-lg rounded-bl-lg p-2"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500 font-semibold">
            {data.sender.name}
          </div>
          <div className="text-[0.6rem] text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <div className="bg-white rounded-md">
              <Image
                onClick={() => setImageModalOpen(true)}
                alt="Image"
                height="220"
                width="220"
                src={data.image}
                className="object-cover cursor-pointer rounded-md transition translate"
              />
            </div>
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
