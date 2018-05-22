export interface Course {
  id?: string;
  creator?: string;
  name: string;
  city: string;
  holes: number;
  slope: number;
  cr: number;
  par: number;
  scorecard: {
    [hole: number]: {
      par: number;
      hcp: number;
      dis: number;
    }
  };
}
