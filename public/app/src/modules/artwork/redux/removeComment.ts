import { artworkService } from "../services";

export const removeComment = async (
  dispatch: any,
  actionType: string,
  commentId: string,
  artworkId: string
) => {
  const result = await artworkService.removeComment(commentId, artworkId);
  if (result.isRight() == true) {
    const artwork = await artworkService.getArtwork(artworkId);
    if (artwork.isRight() == true) {
      dispatch({ type: actionType, payload: artwork.value.getValue() });
    }
  }
};
