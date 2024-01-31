import { Unit } from "./unit";

export interface Worker extends Unit {
  progress: number;
  carriedGold: number
}