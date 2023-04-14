import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SignupPageProps = {
  email: "",
  password: "",
  phase: "checkInputs",
  name: "",
};

const signupSlice = createSlice({
  name: "signup",
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

    updateName(preState, action: PayloadAction<string>) {
      return { ...preState, name: action.payload };
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
    reducer: signupSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};

export const updateEmail = signupSlice.actions.updateEmail;
export const updatePassword = signupSlice.actions.updatePassword;
export const changePhase = signupSlice.actions.changePhase;
export const updateName = signupSlice.actions.updateName;
export type RootState = typeof initialState;
