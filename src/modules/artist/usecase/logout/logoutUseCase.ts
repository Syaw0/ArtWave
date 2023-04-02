import { left, Result, right } from "../../../../shared/core/result";
import { UseCase } from "../../../../shared/core/usecase";
import { RedisAuthenticationService } from "../../service/redis/redisAuthenticationService";
import { LogoutDTO } from "./logoutDTO";
import { LogoutError } from "./logoutError";
import { LogoutResponse } from "./logoutResponse";

export class LogoutUseCase implements UseCase<LogoutDTO, LogoutResponse> {
  constructor(private authService: RedisAuthenticationService) {}

  async execute(request: LogoutDTO): Promise<LogoutResponse> {
    const isRefreshTokenExist = await this.authService.isSessionExist(
      request.email,
      request.refreshToken
    );
    if (!isRefreshTokenExist) {
      return left(new LogoutError.RefreshTokenIsNotProvided());
    }
    try {
      await this.authService.clearToken(request.email, request.refreshToken);
    } catch (err) {
      return left(Result.fail<any>(err as any));
    }

    return right(Result.ok<any>());
  }
}
