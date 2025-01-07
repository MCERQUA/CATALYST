export type AuthMode = 'login' | 'signup' | 'forgot-password';

export interface AuthFormProps {
  mode: AuthMode;
  onToggleMode: (mode: AuthMode) => void;
}