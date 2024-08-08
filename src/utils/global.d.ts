import "little-state-machine";
import { FormSchemaType } from "./types";

declare module "little-state-machine" {
  interface GlobalState {
    information: FormSchemaType;
  }
}
