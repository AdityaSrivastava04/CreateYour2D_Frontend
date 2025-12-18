import React, { useState } from 'react';
import Sidebar from '../sideBar/sidebar.tsx';
import ChatArea from './chatArea.tsx';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  videoUrl?: string;
  timestamp: string;
  isLoading?: boolean;
}

export interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

const MainContent: React.FC = () => {
  const [chats, setChats] = useState<ChatHistory[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const activeChat = chats.find(chat => chat.id === activeChatId);

  const handleCreateNewChat = (newChat: ChatHistory) => {
    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
  };

  const handleDeleteChat = (chatId: string) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    if (activeChatId === chatId) {
      setActiveChatId(updatedChats.length > 0 ? updatedChats[0].id : null);
    }
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
  };

  const handleUpdateMessages = (messages: Message[]) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === activeChatId
          ? { ...chat, messages }
          : chat
      )
    );
  };

  return (
    <div className="flex h-screen w-full bg-gray-950">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onCreateNewChat={handleCreateNewChat}
        onDeleteChat={handleDeleteChat}
        onSelectChat={handleSelectChat}
      />
      <ChatArea
        activeChatId={activeChatId}
        messages={activeChat?.messages || []}
        onUpdateMessages={handleUpdateMessages}
      />
    </div>
  );
};

export default MainContent;
