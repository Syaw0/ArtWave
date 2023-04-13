import { artistService } from "../services";

export const updateInformation = async (
  dispatch: any,
  actionType: string,
  artistId: string,
  name: string,
  biography: string
) => {
  const result = await artistService.updateInformation(
    artistId,
    name,
    biography
  );
  if (result.isRight() == true) {
    return true;
  }
  return false;
};
