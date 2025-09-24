import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);



  // "dependencies": {
  //   "expo": "~54.0.10",
  //   "expo-status-bar": "~3.0.8",
  //   "react": "19.1.0",
  //   "react-native": "0.81.4"
  // },