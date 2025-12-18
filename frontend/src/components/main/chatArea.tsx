import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  videoUrl?: string;
  timestamp: string;
  isLoading?: boolean;
}

interface ChatAreaProps {
  activeChatId: string | null;
  messages: Message[];
  onUpdateMessages: (messages: Message[]) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  activeChatId,
  messages,
  onUpdateMessages,
}) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!activeChatId) {
      alert('Please create or select a conversation first!');
      return;
    }

    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };
    
    const updatedMessages = [...messages, newMessage];
    onUpdateMessages(updatedMessages);
    setInput('');
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'Generating your video...',
      timestamp: new Date().toISOString(),
      isLoading: true,
    };
    
    onUpdateMessages([...updatedMessages, loadingMessage]);

    try {
      const response = await axios.post('YOUR_BACKEND_API_URL/generate-video', {
        prompt: trimmed,
      }, {
        responseType: 'blob', 
      });
      const videoBlob = new Blob([response.data], { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(videoBlob);
      const finalMessages = [...updatedMessages, loadingMessage].map((msg) =>
        msg.id === loadingMessage.id
          ? {
              ...msg,
              content: 'Here is your generated video:',
              videoUrl,
              isLoading: false,
            }
          : msg
      );
      
      onUpdateMessages(finalMessages);
    } catch (error) {
      console.error('Error generating video:', error);
      const finalMessages = [...updatedMessages, loadingMessage].map((msg) =>
        msg.id === loadingMessage.id
          ? {
              ...msg,
              content: 'Sorry, there was an error generating the video. Please try again.',
              isLoading: false,
            }
          : msg
      );
      
      onUpdateMessages(finalMessages);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleDownload = (videoUrl: string, messageId: string) => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `video-${messageId}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full  flex-1 bg-gray-950">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {!activeChatId ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-lg">
            Select a conversation or create a new one to get started
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-lg">
            Start a conversation by typing a message below
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xl rounded-2xl px-4 py-3 text-sm shadow 
                ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-800 text-gray-100 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-wrap break-words">
                  {msg.content}
                </div>
                
                {msg.isLoading && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                )}

                {msg.videoUrl && (
                  <div className="mt-3 space-y-2">
                    <video
                      src={msg.videoUrl}
                      controls
                      className="w-full rounded-lg"
                    />
                    <button
                      onClick={() => handleDownload(msg.videoUrl!, msg.id)}
                      className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 
                        text-white text-xs font-medium rounded-lg transition-colors
                        flex items-center justify-center gap-2"
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                        />
                      </svg>
                      Download Video
                    </button>
                  </div>
                )}

                <div className="mt-1 text-[10px] text-gray-300 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
      
      <div className="border-t border-gray-800 bg-gray-900 pt-3 pb-4">
        <div className="max-w-3xl mx-auto flex items-center gap-2 px-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={activeChatId ? "Type your prompt here..." : "Create a conversation to start"}
            disabled={!activeChatId}
            className="flex-1 rounded-xl bg-gray-800 text-gray-100 px-4 py-3 text-sm 
              outline-none border border-gray-700 focus:border-blue-500 
              focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || !activeChatId}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium
              disabled:bg-gray-600 disabled:cursor-not-allowed
              hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
