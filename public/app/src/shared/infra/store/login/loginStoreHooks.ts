import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./loginStore";

export const useLoginStore = useSelector as TypedUseSelectorHook<RootState>;
