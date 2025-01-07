import { useEffect, useState, useRef } from 'react';
import { MessageSquare, Send, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Add welcome message when component mounts
    setMessages([{
      id: '1',
      content: "Welcome to Catalyst! I'm your AI companion on this journey of transformation. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }]);

    // Initialize ElevenLabs Convai
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
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

    // Trigger ElevenLabs Convai
    const convaiElement = document.querySelector('elevenlabs-convai');
    if (convaiElement) {
      (convaiElement as any).sendMessage(inputValue);
    }

    // Simulate response (this will be replaced by actual ElevenLabs response)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Chat container with animated border */}
      <div className="relative p-1 rounded-lg overflow-hidden bg-gradient-to-r from-purple-500/20 via-orange-500/20 to-purple-500/20 animate-pulse">
        <div className="bg-[rgba(30,30,30,0.9)] backdrop-blur-xl rounded-lg overflow-hidden">
          {/* Chat header */}
          <div className="p-4 border-b border-gray-700 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Catalyst AI Assistant</h2>
          </div>

          {/* Messages container */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-purple-500/20 text-white'
                      : 'bg-orange-500/20 text-white'
                  }`}
                >
                  {message.content}
                </div>
              </div>
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

          {/* Input form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-purple-600/80 text-white px-4 py-2 rounded-lg hover:bg-purple-700/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Hidden ElevenLabs Convai element */}
      <div className="hidden">
        <elevenlabs-convai agent-id="lnUhziBJxOjIf1hvy4TO"></elevenlabs-convai>
      </div>
    </div>
  );
}