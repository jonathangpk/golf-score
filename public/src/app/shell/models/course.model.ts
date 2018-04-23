export interface Course {
  name: string;
  city: string;
  holes: number;
  scorecard: {
    [hole: number]: {
      par: number;
      handicap: number;
    }
  };
}
