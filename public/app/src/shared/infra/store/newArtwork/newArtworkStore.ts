import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

const initialState: NewArtworkPageProps = {
  isLogin: false,
  loggedArtist: {
    artistBiography: "",
    artistEmail: "",
    artistId: "",
    artistName: "",
    artistProfile: "",
  },
};

const newArtworkIdSlice = createSlice({
  name: "newArtwork",
  initialState: initialState,
  reducers: {},
});

export const makeStore = (preState: Partial<NewArtworkPageProps>) => {
  return configureStore({
    reducer: newArtworkIdSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};
export type RootState = typeof initialState;
