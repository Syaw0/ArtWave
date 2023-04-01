export interface EmailVerificationService {
  sendToken(email: string): Promise<any>;
  checkToken(email: string, token: string | number): Promise<boolean>;
  isTokenBurned(email: string): Promise<boolean>;
}
