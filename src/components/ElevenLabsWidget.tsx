import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface ElevenLabsWidgetProps {
  agentId: string;
  className?: string;
}

export function ElevenLabsWidget({ agentId, className = '' }: ElevenLabsWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;

    const handleError = () => {
      setError('Failed to load ElevenLabs widget');
      setIsLoading(false);
    };

    const handleLoad = () => {
      setIsLoading(false);
    };

    script.addEventListener('error', handleError);
    script.addEventListener('load', handleLoad);

    // Check if script is already loaded
    if (document.querySelector(`script[src="${script.src}"]`)) {
      setIsLoading(false);
    } else {
      document.head.appendChild(script);
    }

    return () => {
      script.removeEventListener('error', handleError);
      script.removeEventListener('load', handleLoad);
    };
  }, []);

  if (error) {
    return (
      <div className="text-center p-4 bg-red-500/10 rounded-lg">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className={className}>
      <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>
    </div>
  );
}