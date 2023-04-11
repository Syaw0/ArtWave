import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SearchPageProps = {
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

const SearchSlice = createSlice({
  name: "search",
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

export const makeStore = (preState: Partial<SearchPageProps>) => {
  return configureStore({
    reducer: SearchSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};
export type RootState = typeof initialState;
