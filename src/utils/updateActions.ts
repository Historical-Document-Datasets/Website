import { GlobalState } from "little-state-machine";
import { FormSchemaType } from "./types";

export function updateInfo(state: GlobalState, payload: FormSchemaType) {
  console.log(state, payload);
  return {
    ...state,
    information: payload,
  };
}
