import React, { useState } from 'react';
import { Mail, Lock, Loader2, RefreshCw, Copy, Check, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { InputField } from './InputField';
import { generateStrongPassword } from '../utils/passwordGenerator';
import { useNavigate } from 'react-router-dom';

export function SignupForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSuggestPassword = () => {
    const newPassword = generateStrongPassword();
    setPassword(newPassword);
    setConfirmPassword(newPassword);
  };

  const handleCopyPassword = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success('Password copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Account created successfully! Please check your email.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign up');
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
          label={
            <div className="flex justify-between items-center">
              <span>Password</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSuggestPassword}
                  className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 text-sm"
                >
                  <RefreshCw className="h-3 w-3" />
                  Suggest
                </button>
                {password && (
                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 text-sm"
                  >
                    {copied ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    Copy
                  </button>
                )}
              </div>
            </div>
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          placeholder="Create a password"
          required
        />
        {password && (
          <p className="text-xs text-gray-400 mt-1">
            Password strength: {password.length >= 12 ? 'Strong' : 'Weak'}
          </p>
        )}
      </div>

      <InputField
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        icon={<Lock className="h-5 w-5 text-gray-400" />}
        placeholder="Confirm your password"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-purple-500/50 rounded-md shadow-sm text-sm font-medium text-white bg-purple-600/80 hover:bg-purple-700/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          'Sign Up'
        )}
      </button>
    </form>
  );
}