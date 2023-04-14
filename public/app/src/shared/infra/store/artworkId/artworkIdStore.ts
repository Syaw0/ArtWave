import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./artworkIdStoreHooks";

export const useArtworkIdStore = useSelector as TypedUseSelectorHook<RootState>;
