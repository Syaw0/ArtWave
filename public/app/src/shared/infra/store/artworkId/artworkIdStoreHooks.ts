import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

const initialState: ArtworkIdPageProps = {
  isLogin: false,
  more: [],
  isArtistLikeArtwork: false,
  loggedArtist: {
    artistBiography: "",
    artistEmail: "",
    artistId: "",
    artistName: "",
    artistProfile: "",
    artistSubscribe: [],
    artistSubscribers: [],
  },
  artwork: {
    artworkPublishDate: "",
    artworkComments: [],
    artworkVotes: [],
    artworkId: "",
    artworkImage: "",
    artworkName: "",
    artworkText: "",
    artworkOwner: {
      artistBiography: "",
      artistEmail: "",
      artistId: "",
      artistName: "",
      artistProfile: "",
      artistSubscribe: [],
      artistSubscribers: [],
    },
  },
};

const artworkIdSlice = createSlice({
  name: "artworkId",
  initialState: initialState,
  reducers: {
    like(preState) {
      return {
        ...preState,
        isArtistLikeArtwork: true,
      };
    },
    unlike(preState) {
      return {
        ...preState,
        isArtistLikeArtwork: false,
      };
    },
    updateArtwork(preState, payload: PayloadAction<Artwork>) {
      return {
        ...preState,
        artwork: payload.payload,
      };
    },
  },
});

export const makeStore = (preState: Partial<ArtworkIdPageProps>) => {
  return configureStore({
    reducer: artworkIdSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};
export type RootState = typeof initialState;
