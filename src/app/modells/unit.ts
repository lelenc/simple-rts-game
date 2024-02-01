export interface Unit {
    name: string;
    status: string;
    isBusy: boolean,
    location: { row: number, col: number }; 
}