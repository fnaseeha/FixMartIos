import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import Main from './screen/Main';
import Login from './screen/Login';
import Register from './screen/Register';
import Complain from './screen/Complain';
import Scanner from './screen/Scanner';
import AssetExample from './components/AssetExample';
import test from './screen/test';
import TestRegister from './screen/TestRegister';
import ComplainSub from './screen/ComplainSub';
import NoQrCodeComplain from './screen/NoQrCodeComplain';
import History from './screen/History';

import { createStackNavigator, createAppContainer } from 'react-navigation';

const Apps = createStackNavigator({
 NoQrCodeComplain: { screen: NoQrCodeComplain },
 Login: { screen: Login },
  Main: { screen: Main },
  
  
  Register: { screen: Register },
  

  History: { screen: History },
  Complain: { screen: Complain },

  ComplainSub: { screen: ComplainSub },

  TestRegister: { screen: TestRegister },
  Scanner: { screen: Scanner },
  test: { screen: test },
});
const App = createAppContainer(Apps);
export default App;
