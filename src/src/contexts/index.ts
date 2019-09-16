import * as React from 'react';
import { IUser, ILocale } from '../types';

interface IAppContext {
  user?: IUser;
  locale?: ILocale;
  state?: any;
  dispatch?: any;
}
interface IServiceModalContext {
  serviceModalState?: any;
  serviceModalDispatch?: any;
}

const AppContext = React.createContext<IAppContext | null>(null);

const ServiceModalContext = React.createContext<IServiceModalContext | null>(null);

export { AppContext, ServiceModalContext };
