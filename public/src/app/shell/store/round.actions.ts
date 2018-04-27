import { Round, Score } from '../models/round.model';
import { UserModel } from './round.state';
export class SetCurrentRound {
  static readonly type = '[Round] Set Current Round';
  constructor (public payload: {id: string}) {}
}
export class TryCreateRound {
  static readonly type = '[Round] Try Create Round';
  constructor(public payload: {name: string, course: string}) {}
}
export class TryAddRound {
  static readonly type = '[Round] Try Add Round';
  constructor(public payload: {id: string}) {}
}
export class TryDeleteRound {
  static readonly type = '[Round] Try Delete Round';
  constructor(public payload: {id: string}) {}
}
export class AddRound {
  static readonly type = '[Round] Add Round';
  constructor(public payload: Round) {}
}
export class DeleteRound {
  static readonly type = ' [Round] Delete Round';
  constructor(public payload: {id: string}) {}
}

export class TryChangeScore {
  static readonly type = '[Round] Try Change Score';
  constructor(public payload: {rid: string, score: Score}) {}
}
export class ChangeScore {
  static readonly type = '[Round] Change Score';
  constructor(public payload: {uid: string, rid: string, score: Score}) {}
}



export class ChangeUserInfo {
  static readonly type = '[USER] Change User Info';
  constructor (public payload: UserModel) {}
}
export class TryChangeUserInfo {
  static readonly type = '[USER] Try Change User Info';
  constructor (public payload: UserModel) {}
}
export class ChangeRoundUserInfo {
  static readonly type = '[USER] Change Round User Info';
  constructor (public payload: {rid: string, uid: string, user: UserModel}) {}
}
