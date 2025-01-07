// Environment configuration management
const ENV_KEYS = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'] as const;
type EnvKey = typeof ENV_KEYS[number];

class EnvironmentConfig {
  private static instance: EnvironmentConfig;
  private cache: Map<string, string> = new Map();

  private constructor() {
    // Initialize cache with environment variables
    ENV_KEYS.forEach(key => {
      const value = import.meta.env[key];
      if (value) {
        this.cache.set(key, value);
      }
    });
  }

  static getInstance(): EnvironmentConfig {
    if (!this.instance) {
      this.instance = new EnvironmentConfig();
    }
    return this.instance;
  }

  get(key: EnvKey): string {
    const value = this.cache.get(key);
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }
}

export const env = EnvironmentConfig.getInstance();