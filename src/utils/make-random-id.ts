import {RandomChoicePool} from "./constants/random-choice-pool";
import {RandomId} from "../types/random-id";

export function makeRandomId(): RandomId {
  let id = "";
  const choices = RandomChoicePool.split("");
  while (choices.length !== id.length)
    id = id.concat(choices[Math.floor(Math.random() * choices.length)]);

  return id;
}