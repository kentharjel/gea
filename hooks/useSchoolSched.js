import { useContext } from "react";
import { SchoolSched } from "../contexts/schooSched";

export function useSchoolSched() {
  const context = useContext(SchoolSched);

  if (!context) {
    throw new Error("useSchoolSched must be used within a SchoolSchedProvider");
  }

  return context;
}
