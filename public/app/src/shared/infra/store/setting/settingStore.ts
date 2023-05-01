import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SettingPageProps = {
  loggedArtist: {
    artistBiography: "",
    artistEmail: "",
    artistId: "",
    artistName: "",
    artistProfile: "",
    artistSubscribe: [],
    artistSubscribers: [],
  },
  isLogin: false,
};

const settingSlice = createSlice({
  name: "setting",
  initialState: initialState,
  reducers: {
    updateArtist(preState, action: PayloadAction<Artist>) {
      return {
        ...preState,
        loggedArtist: action.payload,
      };
    },
  },
});

export const makeStore = (preState: Partial<SettingPageProps>) => {
  return configureStore({
    reducer: settingSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};
export type RootState = typeof initialState;
