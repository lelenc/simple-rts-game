export interface Monster {
    name: string; 
    currentHP: number; 
    fullHP: number;
    location: { row: number, col: number }; 
}