import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ArtistIdPageProps = {
  loggedArtist: {
    artistBiography: "",
    artistEmail: "",
    artistId: "",
    artistName: "",
    artistProfile: "",
  },
  artist: {
    artistBiography: "",
    artistEmail: "",
    artistId: "",
    artistName: "",
    artistProfile: "",
  },
  artistArtworks: [],
  artistVoted: [],
  isLogin: false,
};

const artistIdSlice = createSlice({
  name: "artist",
  initialState: {},
  reducers: {},
});

export const makeStore = (preState: Partial<ArtistIdPageProps>) => {
  return configureStore({
    reducer: artistIdSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};
export type RootState = typeof initialState;
