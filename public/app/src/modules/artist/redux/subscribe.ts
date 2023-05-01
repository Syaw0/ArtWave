import { artistService } from "../services";

export const subscribe = async (
  dispatch: any,
  actionType: string,
  artistId: string,
  subscribedArtistId: string
) => {
  const result = await artistService.subscribe(artistId, subscribedArtistId);
  console.log(result);
  if (result.isRight() == true) {
    dispatch({ type: actionType, payload: result.value.getValue() });
    return true;
  }
  return false;
};
