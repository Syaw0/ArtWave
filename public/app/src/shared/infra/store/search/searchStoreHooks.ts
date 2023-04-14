import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./searchStore";

export const useSearchStore = useSelector as TypedUseSelectorHook<RootState>;
