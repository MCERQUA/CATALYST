import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
    </div>
  );
}