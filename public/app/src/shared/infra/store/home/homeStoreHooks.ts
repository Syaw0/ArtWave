import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./homeStore";

export const useHomeStore = useSelector as TypedUseSelectorHook<RootState>;
