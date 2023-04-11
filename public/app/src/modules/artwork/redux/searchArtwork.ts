import { artworkService } from "../services";

export const searchArtwork = async (
  dispatch: any,
  actionType: string,
  query: string
) => {
  const result = await artworkService.searchArtwork(query);
  if (result.isRight()) {
    dispatch({ type: actionType, payload: result.value.getValue() });
  }
};
