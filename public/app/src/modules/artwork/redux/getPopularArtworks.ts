import { artworkService } from "../services";

export const getPopularArtworks = async (dispatch: any, actionType: string) => {
  const result = await artworkService.getPopularArtworks();
  if (result.isRight() == true) {
    dispatch({ type: actionType, payload: result.value.getValue() });
  }
};
