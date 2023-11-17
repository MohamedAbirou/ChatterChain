import React from "react";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
        <Sidebar>
            <ConversationList users={users} initialItems={conversations} />
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
  );
}
