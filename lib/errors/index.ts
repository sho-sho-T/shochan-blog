export class ContentError extends Error {
  constructor(message: string, public readonly filePath?: string) {
    super(message);
    this.name = 'ContentError';
  }
}

export const logger = {
  error: (message: string, error?: unknown, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ERROR] ${message}`, { error, context, timestamp: new Date().toISOString() });
    }
    // 本番環境では外部ログサービスに送信する仕組みを検討
  }
};