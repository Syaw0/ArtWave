import { artistService } from "../services";

export const updateProfile = async (
  dispatch: any,
  actionType: string,
  image: File,
  artistId: string
) => {
  const result = await artistService.updateProfileImage(image, artistId);
  if (result.isRight() == true) {
    return true;
  }
  return false;
};
