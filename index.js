import 'react-native-gesture-handler';
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/ui/App';
import {name as appName} from './app.json';
if (__DEV__) {
  require('./ReactotronConfig');
}
AppRegistry.registerComponent(appName, () => App);
