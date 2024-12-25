import { EventEmitter } from '../utils/EventEmitter';

const DEFAULT_AGENT_ID = 'lnUhziBJxOjIf1hvy4TO';

declare global {
  interface Window {
    ConvaiClient?: {
      init: (options: { agentId: string }) => Promise<void>;
      startRecording: () => Promise<void>;
      stopRecording: () => Promise<void>;
    };
  }
}

class ElevenLabsService extends EventEmitter {
  private static instance: ElevenLabsService;
  private initialized = false;
  private agentId: string;
  private script?: HTMLScriptElement;
  private convaiElement?: HTMLElement;
  private initTimeout?: NodeJS.Timeout;

  private constructor(agentId: string) {
    super();
    this.agentId = agentId;
  }

  static getInstance(agentId: string = DEFAULT_AGENT_ID): ElevenLabsService {
    if (!this.instance) {
      this.instance = new ElevenLabsService(agentId);
    }
    return this.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const initPromise = Promise.race([
        this.initializeCore(),
        new Promise((_, reject) => {
          this.initTimeout = setTimeout(() => {
            reject(new Error('Voice service initialization timed out'));
          }, 10000);
        })
      ]);

      await initPromise;
      
      if (this.initTimeout) {
        clearTimeout(this.initTimeout);
      }
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  private async initializeCore(): Promise<void> {
    await this.loadScript();
    await this.initializeClient();
    this.setupConvaiElement();
    this.initialized = true;
    this.emit('initialized');
  }

  private loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.script) {
        resolve();
        return;
      }

      this.script = document.createElement('script');
      this.script.src = 'https://elevenlabs.io/convai-widget/index.js';
      this.script.async = true;
      
      this.script.onload = () => resolve();
      this.script.onerror = () => reject(new Error('Failed to load voice service'));
      
      document.head.appendChild(this.script);
    });
  }

  private async initializeClient(): Promise<void> {
    if (!window.ConvaiClient) {
      throw new Error('Voice service not available');
    }
    await window.ConvaiClient.init({ agentId: this.agentId });
  }

  private setupConvaiElement() {
    if (!this.convaiElement) {
      this.convaiElement = document.createElement('elevenlabs-convai');
      this.convaiElement.setAttribute('agent-id', this.agentId);
      this.convaiElement.style.display = 'none';
      document.body.appendChild(this.convaiElement);
    }
  }

  async startRecording(): Promise<void> {
    if (!window.ConvaiClient) throw new Error('Voice service not initialized');
    await window.ConvaiClient.startRecording();
  }

  async stopRecording(): Promise<void> {
    if (!window.ConvaiClient) throw new Error('Voice service not initialized');
    await window.ConvaiClient.stopRecording();
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  cleanup() {
    if (this.initTimeout) {
      clearTimeout(this.initTimeout);
    }
    if (this.script && this.script.parentNode) {
      this.script.parentNode.removeChild(this.script);
    }
    if (this.convaiElement && this.convaiElement.parentNode) {
      this.convaiElement.parentNode.removeChild(this.convaiElement);
    }
    this.initialized = false;
    this.removeAllListeners();
  }
}

// Export a singleton instance
export const elevenlabs = ElevenLabsService.getInstance();