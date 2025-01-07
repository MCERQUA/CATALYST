import { Message } from './types';

export function ChatMessage({ message }: { message: Message }) {
  return (
    <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
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
  );
}