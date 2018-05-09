export interface Round {
  id: string;
  name: string;
  course: string;
  users: string[]; // user ids
  created: string;
  scores: {
    [uid: string]: Score
  };
}
export interface Score {
    [hole: number]: number;
}
