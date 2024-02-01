export interface Building {
  type: string; 
  location: { row: number, col: number }; 
  constructionProgress: number; 
}

export interface Barrack extends Building {
  isBusy: boolean,
  status: string;
}
