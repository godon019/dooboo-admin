import ApolloProviders from '../src/providers/ApolloProvider';
import { AppProvider } from '../src/providers/AppProvider';
import { AuthProvider } from '../src/providers/AuthProvider';
import { Frame } from '../src/components/ui/Frame/Frame';
import { LoadingProvider } from '../src/providers/LoadingProvider';
import { LoggerProvider } from '../src/providers/LoggerProvider';
import React from 'react';
import { RouteProvider } from '../src/providers/RouteProvider';

export const AppProviderDecorator = (storyFn) => (
  <AppProvider>{storyFn()}</AppProvider>
);

export const ApolloProviderDecorator = (storyFn) => (
  <ApolloProviders>{storyFn()}</ApolloProviders>
);

export const AuthProviderDecorator = (storyFn) => (
  <AuthProvider>{storyFn()}</AuthProvider>
);

export const RouteProviderDecorator = (storyFn) => (
  <RouteProvider storybook={true}>{storyFn()}</RouteProvider>
);

export const FrameDecorator = (storyFn) => <Frame>{storyFn()}</Frame>;

export const LoggerProviderDeco = (storyFn) => (
  <LoggerProvider showInit>{storyFn()}</LoggerProvider>
);

export const LoadingProviderDeco = (storyFn) => (
  <LoadingProvider>{storyFn()}</LoadingProvider>
);
