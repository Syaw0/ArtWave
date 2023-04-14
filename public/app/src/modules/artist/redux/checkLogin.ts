import { artistService } from "../services";

export const checkLogin = async (email: string, password: string) => {
  const result = await artistService.checkLogin(email, password);
  if (result.isRight() == true) {
    return result.value.getValue();
  }
  return result.value.getErrorValue();
};
