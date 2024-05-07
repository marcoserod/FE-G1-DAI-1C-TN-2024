import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './navigation/Navigator';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
    changeNavigationBarColor('transparent', true);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      {/*   <LoginScreen /> */}
      <Navigator />
    </NavigationContainer>
  );
}

export default App;
