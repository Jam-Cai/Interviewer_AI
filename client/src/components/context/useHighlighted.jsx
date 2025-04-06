import { useContext } from "react";
import { HighlightedContext } from "./HighlightedContext";

export const useHighlighted = () => useContext(HighlightedContext);
