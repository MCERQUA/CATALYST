import { useEffect, useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Message } from './types';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useElevenLabs } from '../../hooks/useElevenLabs';

const AGENT_ID = 'lnUhziBJxOjIf1hvy4TO';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessage } = useElevenLabs(AGENT_ID);

  useEffect(() => {
    setMessages([{
      id: '1',
      content: "Welcome to Catalyst! I'm your AI companion on this journey of transformation. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    sendMessage(inputValue);

    // Simulate response (this will be replaced by actual ElevenLabs response)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative p-1 rounded-lg overflow-hidden bg-gradient-to-r from-purple-500/20 via-orange-500/20 to-purple-500/20 animate-pulse">
        <div className="bg-[rgba(30,30,30,0.9)] backdrop-blur-xl rounded-lg overflow-hidden">
          <ChatHeader />

          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-purple-500/20">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}