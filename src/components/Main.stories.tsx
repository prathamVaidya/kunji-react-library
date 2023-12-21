import React from 'react';
import { KunjiProvider } from '../index';
import MainComponent from './Main';

export default {
  title: 'MainComponent',
  component: MainComponent,
  decorators: [(Story : React.FC) => <KunjiProvider config={{appId: "test"}}>{
    <Story/>
  }</KunjiProvider>],
};

export const Default = () => {
    return <MainComponent/>
};
