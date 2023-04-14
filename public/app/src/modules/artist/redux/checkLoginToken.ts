import { artistService } from "../services";

export const checkLoginToken = async (email: string, token: string) => {
  const result = await artistService.checkLoginToken(email, token);
  if (result.isRight() == true) {
    return result.value.getValue();
  }
  return result.value.getErrorValue();
};
