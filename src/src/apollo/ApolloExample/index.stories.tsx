import ApolloExample from './Sample';
import { ApolloProviderDecorator } from '../../../.storybook/decorators';
import React from 'react';
import WhatssubExample from './Whatssub';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

const Story = () => <ApolloExample />;
storiesOf('ApolloExample', module)
  .add('default', () => <Story />)
  .add('whatssub', () => <WhatssubExample />);
