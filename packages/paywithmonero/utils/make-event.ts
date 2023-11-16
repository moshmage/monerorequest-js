import {Events} from "../src/types/events";

export function makeEvent(name: Events, payload: Record<string, number|string>) {
  return new CustomEvent(name, {detail: {...payload}, bubbles: true, composed: true})
}