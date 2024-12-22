import React from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { AuthFormProps } from '../types/auth';

export function AuthForm({ mode, onToggleMode }: AuthFormProps) {
  if (mode === 'forgot-password') {
    return <ForgotPasswordForm onBack={() => onToggleMode('login')} />;
  }

  return (
    <div className="w-full">
      {mode === 'login' ? <LoginForm onForgotPassword={() => onToggleMode('forgot-password')} /> : <SignupForm />}
      
      <div className="mt-6 text-center">
        <button 
          onClick={() => onToggleMode(mode === 'login' ? 'signup' : 'login')}
          className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
        >
          {mode === 'login' 
            ? "Don't have an account? Sign up" 
            : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
}