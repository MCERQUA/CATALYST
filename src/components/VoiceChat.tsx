import { useState } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useVoiceChat } from '../hooks/useVoiceChat';

const AGENT_ID = 'lnUhziBJxOjIf1hvy4TO';

export function VoiceChat() {
  const [isListening, setIsListening] = useState(false);
  const { isInitialized, error, toggleRecording } = useVoiceChat(AGENT_ID);

  const handleToggleListening = async () => {
    const success = await toggleRecording();
    if (success) {
      setIsListening(!isListening);
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-400">
        <p>Failed to initialize voice chat</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative p-1 rounded-full overflow-hidden bg-gradient-to-r from-purple-500/20 via-orange-500/20 to-purple-500/20 animate-pulse">
        <div className="bg-[rgba(30,30,30,0.9)] backdrop-blur-xl rounded-full p-8 flex flex-col items-center gap-6">
          {!isInitialized ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
              <p className="text-white text-lg">Initializing voice chat...</p>
              <p className="text-sm text-gray-400">This may take a moment</p>
            </div>
          ) : (
            <>
              <button
                onClick={handleToggleListening}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500/80 hover:bg-red-600/80' 
                    : 'bg-purple-500/80 hover:bg-purple-600/80'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-10 h-10 text-white" />
                ) : (
                  <Mic className="w-10 h-10 text-white" />
                )}
              </button>
              
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-white">
                  {isListening ? 'Listening...' : 'Click to Start'}
                </h2>
                <p className="text-gray-400 text-sm">
                  {isListening 
                    ? 'Speak naturally with our AI assistant' 
                    : 'Start a voice conversation with Catalyst AI'}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {isListening && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-purple-500/20 animate-ping" />
          <div className="absolute w-32 h-32 rounded-full bg-purple-500/10 animate-ping delay-75" />
          <div className="absolute w-40 h-40 rounded-full bg-purple-500/5 animate-ping delay-150" />
        </div>
      )}
    </div>
  );
}