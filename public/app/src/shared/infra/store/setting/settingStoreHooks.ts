import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./settingStore";

export const useSettingStore = useSelector as TypedUseSelectorHook<RootState>;
