import { useNavigate } from 'react-router-dom';
import { Sparkles, Cpu, Box, Clock, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { useState } from 'react';

export function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0118] text-white">
      <nav className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold">Catalyst</span>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white hover:text-purple-400 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="#" className="hover:text-purple-400 transition-colors">Learn</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Build</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Explore</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Docs</a>
            {user ? (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/80 rounded-lg hover:bg-red-700/80 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <button 
                onClick={() => navigate('/login')} 
                className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:hidden flex-col gap-4 absolute left-0 right-0 top-full mt-2 bg-[#1a0f2e] p-4 rounded-lg border border-purple-500/20 shadow-lg z-50`}>
          <a href="#" className="hover:text-purple-400 transition-colors px-4 py-2">Learn</a>
          <a href="#" className="hover:text-purple-400 transition-colors px-4 py-2">Build</a>
          <a href="#" className="hover:text-purple-400 transition-colors px-4 py-2">Explore</a>
          <a href="#" className="hover:text-purple-400 transition-colors px-4 py-2">Docs</a>
          {user ? (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/80 rounded-lg hover:bg-red-700/80 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => navigate('/login')} 
              className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Rest of the component remains exactly the same */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <div className="text-sm text-purple-400 mb-4">Powered by Echo AI Systems</div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
            Create Your Digital Catalyst,<br />
            Ignite Your Legacy
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Birth more than an AI - forge a living extension of your vision that becomes your brand's
            essence, your business's backbone, and your amplifier for change. From answering phones to
            developing websites, from social engagement to strategic planning, your AI catalyst grows with
            you, learns with you, and helps you create reactions that transform not just your business, but
            your entire world. This is where your impact truly begins.
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Start Building
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1a0f2e] p-6 rounded-xl border border-purple-500/20">
            <Box className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Global Network</h3>
            <p className="text-gray-400 text-sm">Connect with APIs and services worldwide</p>
          </div>
          
          <div className="bg-[#1a0f2e] p-6 rounded-xl border border-purple-500/20">
            <Cpu className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smart Automation</h3>
            <p className="text-gray-400 text-sm">Advanced AI-powered task execution</p>
          </div>
          
          <div className="bg-[#1a0f2e] p-6 rounded-xl border border-purple-500/20">
            <Sparkles className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No-Code Interface</h3>
            <p className="text-gray-400 text-sm">Intuitive visual development tools</p>
          </div>
          
          <div className="bg-[#1a0f2e] p-6 rounded-xl border border-purple-500/20">
            <Clock className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Token System</h3>
            <p className="text-gray-400 text-sm">Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}