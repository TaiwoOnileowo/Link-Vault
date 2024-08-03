import { useContext } from "react";
import { AppContext } from "./AppContext";
import { FolderContext } from "./FolderContext";
import { LinkContext } from "./LinkContext";
import { ModalContext } from "./ModalContext";
import { ThemeContext } from "./ThemeContext";

export const useFolderContext = () => useContext(FolderContext);
export const useAppContext = () => useContext(AppContext);
export const useLinkContext = () => useContext(LinkContext);
export const useModalContext = () => useContext(ModalContext);
export const useThemeContext = () => useContext(ThemeContext);
