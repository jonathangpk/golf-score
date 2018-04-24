export class ChangeUserInfo {
  static readonly type = '[USER] Change User Info';
  constructor (public payload: {name: string, handicap: number}) {}
}
export class TryChangeUserInfo {
  static readonly type = '[USER] Try Change User Info';
  constructor (public payload: {name: string, handicap: number}) {}
}
