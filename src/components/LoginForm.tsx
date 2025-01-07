import React, { useState } from 'react';
import { Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { InputField } from './InputField';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onForgotPassword: () => void;
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <InputField
        id="email"
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail className="h-5 w-5 text-gray-400" />}
        placeholder="Enter your email"
        required
      />

      <div className="space-y-1">
        <InputField
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          placeholder="Enter your password"
          required
        />
        
        <div className="text-right">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Forgot your password?
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-purple-500/50 rounded-md shadow-sm text-sm font-medium text-white bg-purple-600/80 hover:bg-purple-700/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
}