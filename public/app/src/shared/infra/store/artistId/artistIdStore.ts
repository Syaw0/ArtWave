import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubscribeDTO } from "../../../../../../../src/modules/artist/usecase/subscribe/subscribeDTO";
import { SubscribeSuccessResponse } from "../../../../../../../src/modules/artist/usecase/subscribe/subscribeResponse";
import { UnSubscribeSuccessResponse } from "../../../../../../../src/modules/artist/usecase/unSubscribe/unSubscribeResponse";

const initialState: ArtistIdPageProps = {
  loggedArtist: {
    artistBiography: "",
    artistEmail: "",
    artistId: "",
    artistName: "",
    artistProfile: "",
    artistSubscribe: [],
    artistSubscribers: [],
  },
  artist: {
    artistBiography: "",
    artistEmail: "",
    artistId: "",
    artistName: "",
    artistProfile: "",
    artistSubscribe: [],
    artistSubscribers: [],
  },
  artistArtworks: [],
  artistVoted: [],
  isLogin: false,
  isFollowed: false,
};

const artistIdSlice = createSlice({
  name: "artist",
  initialState: initialState,
  reducers: {
    updateSubscribeData(
      preState,
      payload: PayloadAction<SubscribeSuccessResponse>
    ) {
      return {
        ...preState,
        artist: {
          ...preState.artist,
          artistSubscribers: payload.payload.subscribedArtistSubscribers,
        },
        loggedArtist: {
          ...preState.loggedArtist,
          artistSubscribe: payload.payload.loggedArtistSubscribes,
        },
        isFollowed: true,
      };
    },

    updateUnSubscribeData(
      preState,
      payload: PayloadAction<UnSubscribeSuccessResponse>
    ) {
      return {
        ...preState,
        artist: {
          ...preState.artist,
          artistSubscribers: payload.payload.unSubscribedArtistSubscribers,
        },
        loggedArtist: {
          ...preState.loggedArtist,
          artistSubscribe: payload.payload.loggedArtistSubscribes,
        },
        isFollowed: false,
      };
    },
  },
});

export const makeStore = (preState: Partial<ArtistIdPageProps>) => {
  return configureStore({
    reducer: artistIdSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};
export type RootState = typeof initialState;
