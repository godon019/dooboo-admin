// TODO: remove this sample interface
export interface IUser {
  displayName: string;
  age: number;
  job: string;
}

export interface ILocale {
  default: string;
  current: string;
}

export interface ServiceServerOnlyValues {
  id: string;
  keyName: string;
  thumbnail: string;
  image: string;
  homepage: string;
  iosAppStoreUrl: string;
  androidPlayStoreUrl: string;
  categoryId: string;
  serviceGroupId: string;
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

export interface ServiceGroup {
  id: string;
  key: string;
  description: string;
}
export type ServiceGroupCreateMutation = Omit<ServiceGroup, 'id'>;
export type ServiceGroupUpdateMutation = ServiceGroup;
export type ServiceGroupFront = ServiceGroup & {
  nameEn: string;
  nameKr: string;
};
export type ServiceGroupTableLabel = Pick<
  ServiceGroupFront,
  'id' | 'key' | 'description' | 'nameEn' | 'nameKr'
> & { setting: string };

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

// Subs + SubsOption used in ServiceDetail
export interface SubsNOp {
  id: string;
  case: number;
  folderKeyName: string;
  directLink: string;
  keyName: string;
  pricePlan: number;
  currency: Currency;
  periodUnit: number;
  periodType: PeriodType;
  memo: string;
  serviceId: string;
  promotion: string;
}

export type SubsNOpFront = SubsNOp & {
  nameEn: string;
  nameKr: string;
};
export type SubsNOpTableLabel = Pick<
  SubsNOpFront,
  | 'keyName'
  | 'nameKr'
  | 'nameEn'
  | 'pricePlan'
  | 'currency'
  | 'periodType'
  | 'periodUnit'
  | 'case'
>;
export type SubsNOpCreateMutation = Omit<SubsNOp, 'id'>;
export type SubsNOpUpdateMutation = Omit<SubsNOp, 'serviceId'>;

export interface Subs {
  id: string;
  keyName: string;
  price: number;
  directLink: string;
  memo: string;
  subsOption: SubsOption;
}
export interface SubsOption {
  id: string;
  folderKeyName: string;
  pricePlan: number;
  currency: Currency;
  case: number;
  periodUnit: number;
  periodType: PeriodType;
  promotion: string;
}

export interface SubsCreateInput {
  serviceId: string;
  keyName: string;
  price: number;
  directLink: string;
  memo: string;
}

export interface SubsUpdateInput {
  id: string;
  keyName: string;
  price: number;
  directLink: string;
  memo: string;
}

export interface SubsOptionCreateInput {
  folderKeyName: string;
  pricePlan: number;
  currency: string;
  case: number;
  periodUnit: number;
  periodType: PeriodType;
  promotion: string;
}
