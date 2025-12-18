import React, { useEffect } from 'react';

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

interface SidebarProps {
  chats: ChatHistory[];
  activeChatId: string | null;
  onCreateNewChat: (chat: ChatHistory) => void;
  onDeleteChat: (chatId: string) => void;
  onSelectChat: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  activeChatId,
  onCreateNewChat,
  onDeleteChat,
  onSelectChat,
}) => {
  useEffect(() => {
    const savedChats = localStorage.getItem('createyour2D_chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      parsedChats.forEach((chat: ChatHistory) => {
        if (!chats.find(c => c.id === chat.id)) {
          onCreateNewChat(chat);
        }
      });
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('createyour2D_chats', JSON.stringify(chats));
  }, [chats]);

  const createNewChat = () => {
    const newChat: ChatHistory = {
      id: Date.now().toString(),
      title: `Chat ${chats.length + 1}`,
      timestamp: new Date().toISOString(),
      messages: []
    };
    onCreateNewChat(newChat);
  };

  return (
    <div className="w-96 h-screen bg-gray-900 text-white flex flex-col border-r border-gray-700">
      <div className='m-10'>
        <div className="border-b border-gray-700 p-8 w-full">
          <button
            onClick={createNewChat}
            className="m-2px w-full flex items-center justify-center gap-3 p-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 
            hover:to-blue-800 rounded-xl text-white font-semibold text-lg transition-all duration-200 shadow-lg 
            hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span className="text-3xl">+</span>
            New Conversation
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-3">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center justify-between p-5 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-700 ${
              activeChatId === chat.id
                ? 'bg-blue-600/50 border-2 border-blue-500 shadow-md'
                : 'hover:border-gray-600 border border-transparent'
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="flex-1 min-w-0">
              <div className="font-medium text-base truncate">{chat.title}</div>
              <div className="text-sm text-gray-400 mt-1">
                {new Date(chat.timestamp).toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {chat.messages.length} message{chat.messages.length !== 1 ? 's' : ''}
              </div>
            </div>
            <button
              className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full text-white text-base font-bold flex items-center justify-center ml-4 transition-colors flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.id);
              }}
            >
              ✕
            </button>
          </div>
        ))}

        {chats.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm italic">
            No conversation history
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
