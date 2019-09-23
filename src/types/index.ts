export interface ServiceServerOnlyValues {
  id: string;
  keyName: string;
  thumbnail: string;
  homepage: string;
  categoryId: string;
  memo: string;
}
export type ServiceCreateMutation = Omit<ServiceServerOnlyValues, 'id'>;
export type ServiceUpdateMutation = ServiceServerOnlyValues;
// used for localization and filtering
export type ServiceFront = ServiceServerOnlyValues & {
  name: string;
  nameKr: string;
};

export type ServiceTableLabel = Pick<
  ServiceFront,
  'keyName' | 'name' | 'nameKr' | 'thumbnail'
> & { setting: string };
export type ServiceForServiceDetail = Pick<
  ServiceFront,
  'id' | 'name' | 'nameKr' | 'thumbnail' | 'homepage' | 'memo'
>;
export interface Category {
  id: string;
  key: string;
  description: string;
  released: boolean;
}
export type CategoryCreateMutation = Omit<Category, 'id'>;
export type CategoryUpdateMutation = Category;
export type CategoryFront = Category & {
  nameEn: string;
  nameKr: string;
};
export type CategoryTableLabel = Pick<
  CategoryFront,
  'id' | 'key' | 'description' | 'released' | 'nameEn' | 'nameKr'
>;

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

export type Currency = 'USD' | 'KRW';

export type PeriodType = 'YEARLY' | 'MONTHLY' | 'WEEKLY' | 'DAILY';
