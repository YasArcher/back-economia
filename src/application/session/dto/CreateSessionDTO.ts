export interface CreateSessionDTO {
  userId?: number;
  token: string;
  ipAddress: string;
  userAgent: string;
  expiresAt: Date;
}