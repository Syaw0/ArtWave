import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState: ArtworkIdPageProps = {
  isLogin: false,
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
  name: "artwork",
  initialState: {},
  reducers: {},
});

export const makeStore = (preState: Partial<ArtworkIdPageProps>) => {
  return configureStore({
    reducer: artworkIdSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};
export type RootState = typeof initialState;
