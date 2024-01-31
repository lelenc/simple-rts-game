export interface Building {
  type: string; // Az épület típusa (pl. "Barracks")
  location: { x: number, y: number }; // Az épület pozíciója a térképen
  constructionProgress: number; // Az épület építési folyamata (0-100)
}
