export interface Building {
    type: string; 
    location: { row: number, col: number }; 
    constructionProgress: number; 
  }
  
  export interface Barrack extends Building {
    isBusy: boolean,
    status: string;
  }

  export interface Monster {
    name: string; 
    currentHP: number; 
    fullHP: number;
    location: { row: number, col: number }; 
}

export enum UnitType {
  Warrior = 'Warrior',
  Worker = 'Worker'
}

export interface Unit {
    name: string;
    status: string;
    isBusy: boolean,
    location: { row: number, col: number }; 
    type: UnitType;
}

export interface Warrior extends Unit {
    damage: number;
}

export interface Worker extends Unit {
    progress: number;
    carriedGold: number
  }