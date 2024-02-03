export interface Base {
  location: { row: number, col: number };
  isSelected: boolean;
}

export interface Building extends Base {
  type: string;
  constructionProgress: number;
}

export interface Barrack extends Building {
  isBusy: boolean,
  status: string;
}

export interface Monster extends Base{
  name: string;
  currentHP: number;
  fullHP: number;
}

export enum UnitType {
  Warrior = 'Warrior',
  Worker = 'Worker'
}

export interface Unit extends Base {
  name: string;
  status: string;
  isBusy: boolean,
  type: UnitType;
}

export interface Warrior extends Unit {
  damage: number;
}

export interface Worker extends Unit {
  carriedGold: number
}