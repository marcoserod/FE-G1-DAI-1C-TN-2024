import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './navigation/Navigator';

import Toast from 'react-native-toast-message';
import {toastConfig} from './components/commons/CustomToast';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '../store/reduxStore';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
    changeNavigationBarColor('transparent', true);
  }, []);

  return (
    <>
      <ReduxProvider store={store}>
        <NavigationContainer>
          <StatusBar translucent backgroundColor="transparent" />
          <Navigator />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </ReduxProvider>
    </>
  );
}

export default App;
