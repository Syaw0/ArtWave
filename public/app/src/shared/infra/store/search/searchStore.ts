import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SearchPageProps = {
  artist: {
    artistBiography: "",
    artistEmail: "",
    artistId: "",
    artistName: "",
    artistProfile: "",
    artistSubscribe: [],
    artistSubscribers: [],
  },
  artworks: [],
  isLogin: false,
  searchQuery: "",
};

const SearchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    updateArtworksList(preState, action: PayloadAction<Artwork[]>) {
      return {
        ...preState,
        artworks: action.payload,
      };
    },
    updateSearchQuery(preState, action: PayloadAction<string>) {
      return {
        ...preState,
        searchQuery: action.payload,
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
