import { useEffect } from 'react';

interface ElevenLabsWidgetProps {
  agentId: string;
  className?: string;
}

export function ElevenLabsWidget({ agentId, className = '' }: ElevenLabsWidgetProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className={className}>
      <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>
    </div>
  );
}