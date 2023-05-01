import { artistService } from "../services";

export const unSubscribe = async (
  dispatch: any,
  actionType: string,
  artistId: string,
  unSubscribedArtistId: string
) => {
  const result = await artistService.unSubscribe(
    artistId,
    unSubscribedArtistId
  );
  console.log(result);
  if (result.isRight() == true) {
    dispatch({ type: actionType, payload: result.value.getValue() });
    return true;
  }
  return false;
};
