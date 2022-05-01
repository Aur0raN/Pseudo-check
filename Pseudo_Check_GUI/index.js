/**
 * @format
 */

 import { LogBox } from 'react-native';

 LogBox.ignoreLogs([
   "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
 ]);
 
import {AppRegistry} from 'react-native';
import AccountSearch from './src/components/AccountSearch';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AccountSearch);
