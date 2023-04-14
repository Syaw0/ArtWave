import { artworkService } from "../services";

export const getLatestArtworks = async (dispatch: any, actionType: string) => {
  const result = await artworkService.getLatestArtworks();
  if (result.isRight() == true) {
    dispatch({ type: actionType, payload: result.value.getValue() });
  }
};
