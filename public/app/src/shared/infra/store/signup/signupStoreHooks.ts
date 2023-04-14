import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./signupStore";

export const useSignupStore = useSelector as TypedUseSelectorHook<RootState>;
