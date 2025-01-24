import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

console.log('App Name:', appName); // Debug log
AppRegistry.registerComponent(appName, () => App);
