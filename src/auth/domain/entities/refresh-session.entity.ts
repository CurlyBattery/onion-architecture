export interface IRefreshSession {
  id?: number;
  userId: number;
  refreshToken: string;
  ua: string;
  fingerprint: string;
  ip: string;
  expiresIn: number;
  createdAt?: Date;
}
