import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: LoginPageProps = {
  email: "",
  password: "",
  phase: "checkInputs",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateEmail(preState, action: PayloadAction<string>) {
      return {
        ...preState,
        email: action.payload,
      };
    },

    updatePassword(preState, action: PayloadAction<string>) {
      return {
        ...preState,
        password: action.payload,
      };
    },

    changePhase(preState, action: PayloadAction<"checkInputs" | "checkToken">) {
      return {
        ...preState,
        phase: action.payload,
      };
    },
  },
});

export const makeStore = (preState: Partial<LoginPageProps>) => {
  return configureStore({
    reducer: loginSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};

export const updateEmail = loginSlice.actions.updateEmail;
export const updatePassword = loginSlice.actions.updatePassword;
export type RootState = typeof initialState;
