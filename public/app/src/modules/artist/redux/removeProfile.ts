import { artistService } from "../services";

export const removeProfile = async (
  dispatch: any,
  actionType: string,
  artistId: string
) => {
  const result = await artistService.removeProfileImage(artistId);
  if (result.isRight() == true) {
    return true;
  }
  return false;
};
