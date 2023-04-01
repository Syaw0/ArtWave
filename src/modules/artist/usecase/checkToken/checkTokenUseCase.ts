import { left, Result, right } from "../../../../shared/core/result";
import { UseCase } from "../../../../shared/core/usecase";
import { EmailVerificationService } from "../../service/emailVerificationService";
import { CheckTokenDTO } from "./checkTokenDTO";
import { CheckTokenError } from "./checkTokenError";
import { CheckTokenResponse } from "./checkTokenResponse";

export class CheckTokenUseCase
  implements UseCase<CheckTokenDTO, CheckTokenResponse>
{
  constructor(private emailVerificationService: EmailVerificationService) {}

  async execute(request: CheckTokenDTO): Promise<CheckTokenResponse> {
    const isExist = await this.emailVerificationService.isTokenExist(
      request.email
    );
    if (!isExist) {
      return left(new CheckTokenError.TokenIsNotExist());
    }

    const isBurned = await this.emailVerificationService.isTokenBurned(
      request.email
    );
    if (isBurned) {
      return left(new CheckTokenError.TokenIsBurned());
    }

    const isEqual = await this.emailVerificationService.checkToken(
      request.email,
      request.token
    );
    if (!isEqual) {
      return left(new CheckTokenError.WrongToken());
    }

    return right(Result.ok<any>("its okay"));
  }
}
