import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState: ArtworkIdPageProps = {
  isLogin: false,
  isArtistLikeArtwork: false,
  loggedArtist: {
    artistBiography: "",
    artistEmail: "",
    artistId: "",
    artistName: "",
    artistProfile: "",
  },
  artwork: {
    artworkComments: [],
    artworkVotes: [],
    artworkId: "",
    artworkImage: "",
    artworkName: "",
    artworkOwner: {
      artistBiography: "",
      artistEmail: "",
      artistId: "",
      artistName: "",
      artistProfile: "",
    },
  },
};

const artworkIdSlice = createSlice({
  name: "artworkId",
  initialState: {},
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
  },
});

export const makeStore = (preState: Partial<ArtworkIdPageProps>) => {
  return configureStore({
    reducer: artworkIdSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};
export type RootState = typeof initialState;
