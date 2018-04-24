import { User } from 'firebase';

export class LoginGoogle {
  static readonly type = ' [AUTH] Login Google';
}
export class LoginAnon {
  static readonly type = '[AUTH] Login Anon';
}
export class LoginEmail {
  static readonly type = '[AUTH] Login Email';
  constructor(public payload: {email: string, password: string}) {}
}
export class Register {
  static readonly type = '[AUTH] Register';
  constructor(public payload: {email: string, password: string, name: string, handicap: number}) {}
}
export class Logout {
  static readonly type = '[AUTH] Logout';
}
export class AuthChange {
  static readonly type = '[AUTH] Auth Change';
  constructor(public payload: {uid: string, user: User}) {}
}
export class StartQuery {
  static readonly type = '[AUTH] Start Query';
}
export class StopQuery {
  static readonly type = '[AUTH] Stop Query';
}
