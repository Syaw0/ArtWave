import { artworkService } from "../services";

export const like = async (
  dispatch: any,
  actionType: string,
  artistId: string,
  artworkId: string
) => {
  const result = await artworkService.like(artistId, artworkId);
  if (result.isRight() == true) {
    dispatch({ type: actionType });
  }
};
