import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function ChatInput({ value, onChange, onSubmit, isLoading }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-gray-700">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-800/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="bg-purple-600/80 text-white px-4 py-2 rounded-lg hover:bg-purple-700/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}