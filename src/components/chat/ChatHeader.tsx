import { MessageSquare } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="p-4 border-b border-gray-700 flex items-center gap-3">
      <MessageSquare className="w-6 h-6 text-purple-400" />
      <h2 className="text-xl font-semibold text-white">Catalyst AI Assistant</h2>
    </div>
  );
}