import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
        404 - Page Not Found
      </h1>
      <p className="text-xl text-gray-400">
        The page you're looking for doesn't exist
      </p>
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 px-6 py-3 text-purple-400 hover:text-purple-300 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Return Home
      </button>
    </div>
  );
}