import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: HomePageProps = {
  artist: {
    artistBiography: "",
    artistEmail: "",
    artistId: "",
    artistName: "",
    artistProfile: "",
  },
  artworks: [],
  isLogin: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState: {},
  reducers: {
    updateArtworksList(preState, action: PayloadAction<Artwork[]>) {
      return {
        ...preState,
        artworks: action.payload,
      };
    },
  },
});

export const makeStore = (preState: Partial<HomePageProps>) => {
  return configureStore({
    reducer: homeSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};
export type RootState = typeof initialState;
