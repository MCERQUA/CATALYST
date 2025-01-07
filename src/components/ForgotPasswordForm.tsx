import { useState } from 'react';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { InputField } from './InputField';
import { SITE_URL } from '../lib/constants';

export function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${SITE_URL}/reset-password`,
      });

      if (error) throw error;

      setSent(true);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send reset instructions');
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-4">Check Your Email</h3>
        <p className="text-gray-300 mb-6">
          We've sent password reset instructions to {email}
        </p>
        <button
          onClick={onBack}
          className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to login
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-4 text-center">Reset Password</h3>
      <p className="text-gray-300 mb-6 text-center text-sm">
        Enter your email address and we'll send you instructions to reset your password.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="reset-email"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="h-5 w-5 text-gray-400" />}
          placeholder="Enter your email"
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
            'Send Reset Instructions'
          )}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-purple-400 hover:text-purple-300 text-sm transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </button>
      </form>
    </div>
  );
}