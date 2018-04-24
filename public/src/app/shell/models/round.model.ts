export interface Round {
  name: string;
  users: string[]; // user ids
  scores: {
    [uid: string]: Score
  };
}
export interface Score {
    [hole: number]: number;
}
