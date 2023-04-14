import { artistService } from "../services";

export const checkSignupToken = async (
  email: string,
  password: string,
  name: string,
  token: string
) => {
  const result = await artistService.checkSignupToken(
    email,
    password,
    name,
    token
  );
  if (result.isRight() == true) {
    return result.value.getValue();
  }
  return result.value.getErrorValue();
};
