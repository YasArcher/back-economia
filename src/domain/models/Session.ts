export interface Session {
    id?: number;
    userId: number;
    token: string;
    ipAddress: string;
    userAgent: string;
    createdAt?: Date;
    expiresAt: Date;
  }
  