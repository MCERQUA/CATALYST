import { useEffect, useCallback, useState } from 'react';

declare global {
  interface Window {
    ConvaiClient?: {
      init: (options: { agentId: string }) => Promise<void>;
      startRecording: () => Promise<void>;
      stopRecording: () => Promise<void>;
    };
  }
}

export function useVoiceChat(agentId: string) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    
    script.onload = async () => {
      try {
        if (window.ConvaiClient) {
          await window.ConvaiClient.init({ agentId });
          setIsInitialized(true);
        }
      } catch (err) {
        setError('Failed to initialize voice chat');
        console.error(err);
      }
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [agentId]);

  const toggleRecording = useCallback(async () => {
    if (!window.ConvaiClient || !isInitialized) return false;

    try {
      if (document.querySelector('elevenlabs-convai[recording="true"]')) {
        await window.ConvaiClient.stopRecording();
      } else {
        await window.ConvaiClient.startRecording();
      }
      return true;
    } catch (err) {
      setError('Failed to toggle recording');
      console.error(err);
      return false;
    }
  }, [isInitialized]);

  return {
    isInitialized,
    error,
    toggleRecording
  };
}