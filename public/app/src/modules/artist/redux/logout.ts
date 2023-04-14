import { artistService } from "../services";

export const logout = async (artistEmail: string) => {
  const result = await artistService.logout(artistEmail);
  if (result.isRight() == true) {
    return true;
  }
  return false;
};
