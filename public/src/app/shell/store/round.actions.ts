import { Round, Score } from '../models/round.model';
export class SetCurrentRound {
  static readonly type = '[Round] Set Current Round';
  constructor (public payload: {id: string}) {}
}
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
export class AddRound {
  static readonly type = '[Round] Add Round';
  constructor(public payload: Round) {}
}
export class ChangeScore {
  static readonly type = '[Round] Change Score';
  constructor(public payload: {score: Score}) {}
}
export class AddScore {
  static readonly type = '[Round] Add Score';
  constructor(public payload: {score: Score}) {}
}
