import { useEffect, useState } from 'react';
import { elevenlabs } from '../services/elevenlabs';

export function useElevenLabs() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleInitialized = () => setIsInitialized(true);
    const handleError = (error: Error) => setError(error);

    elevenlabs.on('initialized', handleInitialized);
    elevenlabs.on('error', handleError);

    if (!elevenlabs.isInitialized()) {
      elevenlabs.initialize().catch(handleError);
    } else {
      setIsInitialized(true);
    }

    return () => {
      elevenlabs.off('initialized', handleInitialized);
      elevenlabs.off('error', handleError);
    };
  }, []);

  return {
    isInitialized,
    error,
    startRecording: () => elevenlabs.startRecording(),
    stopRecording: () => elevenlabs.stopRecording()
  };
}