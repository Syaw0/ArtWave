import { artistService } from "../services";

export const checkSignup = async (
  email: string,
  password: string,
  name: string
) => {
  const result = await artistService.checkSignup(email, password, name);
  if (result.isRight() == true) {
    return result.value.getValue();
  }
  return result.value.getErrorValue();
};
