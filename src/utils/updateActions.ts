import { GlobalState } from "little-state-machine";
import { FormSchemaType } from "./types";

export function updateInfo(state: GlobalState, payload: FormSchemaType) {
  return {
    ...state,
    information: payload,
  };
}
