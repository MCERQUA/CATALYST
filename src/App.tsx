import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { AuthForm } from './components/AuthForm';
import { MouseEffect } from './components/MouseEffect';
import { AmbientBackground } from './components/AmbientBackground';
import { LoadingScreen } from './components/LoadingScreen';
import { WelcomeMessage } from './components/WelcomeMessage';
import { ComingSoon } from './components/ComingSoon';
import { NotFound } from './components/NotFound';
import { LandingPage } from './components/LandingPage';
import { Toaster } from 'react-hot-toast';
import { AuthMode } from './types/auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export function App() {
  const { isLoading, user } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={
          !user ? (
            <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center p-4 overflow-hidden">
              <MouseEffect />
              <AmbientBackground />
              <div 
                id="auth-content"
                className="relative z-10 bg-[rgba(30,30,30,0.7)] backdrop-blur-xl p-8 rounded-2xl max-w-md w-full shadow-[0_0_15px_rgba(147,51,234,0.3)] border border-purple-500/20"
              >
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold mb-2">
                    <span className="text-white">You Are The </span>
                    <span className="text-purple-500 [text-shadow:0_0_15px_rgba(147,51,234,0.5)]">Catalyst</span>
                  </h1>
                  <h2 className="text-xl font-medium text-purple-400 mb-4 [text-shadow:0_0_10px_rgba(167,139,250,0.5)]">
                    Ignite Change
                  </h2>
                  <p className="text-gray-300">
                    Take the first step towards igniting change in your journey. 
                    Our AI-powered platform helps you transform ideas into reality.
                  </p>
                </div>
                <AuthForm 
                  mode={authMode} 
                  onToggleMode={setAuthMode}
                />
              </div>
            </div>
          ) : (
            <Navigate to="/welcome" replace />
          )
        } />
        <Route path="/welcome" element={
          user ? <WelcomeMessage /> : <Navigate to="/login" replace />
        } />
        <Route path="/coming-soon" element={
          <>
            <MouseEffect />
            <AmbientBackground />
            <ComingSoon />
          </>
        } />
        <Route path="*" element={
          <>
            <MouseEffect />
            <AmbientBackground />
            <NotFound />
          </>
        } />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}