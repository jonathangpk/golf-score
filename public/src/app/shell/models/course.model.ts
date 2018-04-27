export interface Course {
  name: string;
  city: string;
  holes: number;
  slope: number;
  cr: number;
  par: number;
  scorecard: {
    [hole: number]: {
      par: number;
      handicap: number;
      dis: number;
    }
  };
}
