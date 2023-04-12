import { artworkService } from "../services";

export const comment = async (
  dispatch: any,
  actionType: string,
  artistId: string,
  artworkId: string,
  text: string
) => {
  const result = await artworkService.comment(artistId, artworkId, text);
  if (result.isRight() == true) {
    const artwork = await artworkService.getArtwork(artworkId);
    if (artwork.isRight() == true) {
      dispatch({ type: actionType, payload: artwork.value.getValue() });
    }
  }
};
