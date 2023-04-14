import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./artistIdStore";

export const useArtistIdStore = useSelector as TypedUseSelectorHook<RootState>;
