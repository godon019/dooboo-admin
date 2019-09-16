export interface Admin {
  id: string;
  email: string;
  password: string;
  name: string;
  privilege: string;
  verified: number;
  created: Date;
  updated: Date;
  deleted: Date;
}

export type AdminSignIn = Pick<Admin, 'email' | 'password'>;
export type AdminSignUp = Pick<Admin, 'email' | 'password' | 'name'>;
export type AdminSignUpForm = AdminSignUp & {
  passwordConfirm: string;
};

export interface AuthPayload {
  token: string;
  admin: Admin;
}
