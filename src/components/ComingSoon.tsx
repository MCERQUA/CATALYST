import { ElevenLabsWidget } from './ElevenLabsWidget';

export function ComingSoon() {
  return (
    <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center p-4 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Begin your Journey
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-purple-400">
          with our Onboarding Agent Kat
        </h2>
      </div>
      
      <ElevenLabsWidget 
        agentId="lnUhziBJxOjIf1hvy4TO"
        className="w-full max-w-md"
      />
    </div>
  );
}