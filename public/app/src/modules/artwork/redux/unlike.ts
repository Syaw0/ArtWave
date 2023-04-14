import { artworkService } from "../services";

export const unlike = async (
  dispatch: any,
  actionType: string,
  artistId: string,
  artworkId: string
) => {
  const result = await artworkService.unlike(artistId, artworkId);
  if (result.isRight() == true) {
    dispatch({ type: actionType });
  }
};
