import { useContext } from "react";
import { CodeContext } from "./CodeContext";

export const useCode = () => useContext(CodeContext);
