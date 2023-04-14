import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./newArtworkStore";

export const useNewArtworkStore =
  useSelector as TypedUseSelectorHook<RootState>;
