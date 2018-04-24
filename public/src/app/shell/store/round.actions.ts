import { Score } from '../models/round.model';
export class TryAddRound {
  static readonly type = '[Round] Try Add Round';
  constructor(public payload: {name: string, course: string}) {}
}
export class TryChangeScore {
  static readonly type = '[Round] Try Change Score';
  constructor(public payload: {score: Score}) {}
}
export class TryAddScore {
  static readonly type = '[Round] Try Add Score';
  constructor(public payload: {score: Score}) {}
}
