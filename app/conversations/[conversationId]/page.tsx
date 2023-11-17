import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import { MediaRoomVideo } from "@/app/components/media-room-video";
import { MediaRoomAudio } from "@/app/components/media-room-audio";

interface IParams {
  conversationId: string;
}

interface ConversationProps {
  video?: boolean;
  audio?: boolean;
}

const conversationId = async ({
  params,
  searchParams,
}: {
  params: IParams;
  searchParams: ConversationProps;
}) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <Header conversation={conversation} />
          {searchParams?.video ? (
            <MediaRoomVideo
              chatId={conversation.id}
              video={true}
              audio={true}
            />
          ) : searchParams?.audio ? (
            <MediaRoomAudio
              chatId={conversation.id}
              video={false}
              audio={true}
            />
          ) : (
            <>
              <Body initialMessages={messages} />
              <Form />
            </>
          )}
        </div>
      </div>
  );
};

export default conversationId;