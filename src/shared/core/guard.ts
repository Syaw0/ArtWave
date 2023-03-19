import { Result } from "./result";

export type GuardResponse = string;
export type GuardArgumentCollection = IGuardArgument[];
export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export class Guard {
  public static combine(guardResults: Result<any>[]): Result<GuardResponse> {
    for (let result of guardResults) {
      if (result.isFailure) return result;
    }

    return Result.ok<GuardResponse>();
  }

  public static againstNullOrUndefined(
    argument: any,
    argumentName: string
  ): Result<GuardResponse> {
    if (argument == null) {
      return Result.fail<GuardResponse>(`${argumentName} is null or undefined`);
    } else {
      return Result.ok<GuardResponse>();
    }
  }

  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection
  ): Result<GuardResponse> {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName
      );
      if (result.isFailure) return result;
    }

    return Result.ok<GuardResponse>();
  }

  public static againstAtMost(
    numChar: number,
    text: string
  ): Result<GuardResponse> {
    return text.length <= numChar
      ? Result.ok<GuardResponse>()
      : Result.fail<GuardResponse>(`Text is greater than ${numChar} chars.`);
  }
}
