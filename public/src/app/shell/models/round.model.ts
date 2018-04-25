export interface Round {
  id: string;
  name: string;
  course: string;
  users: string[]; // user ids
  scores: {
    [uid: string]: Score
  };
}
export interface Score {
    [hole: number]: number;
}
