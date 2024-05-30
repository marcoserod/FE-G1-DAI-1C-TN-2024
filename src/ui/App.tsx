import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './navigation/Navigator';

import Toast from 'react-native-toast-message';
import {toastConfig} from './components/commons/CustomToast';
import {Provider as ReduxProvider} from 'react-redux';
import {persistor, store} from '../store/reduxStore';

import {NoConnectionScreen} from './screens/noConnection/NoConnectionScreen';
import {useNetInfo} from '@react-native-community/netinfo';
import {PersistGate} from 'redux-persist/integration/react';
import {LoadingModal} from './components/commons/modal/LoadingModal';
import {COLORS} from '../constants/colors';

function App(): React.JSX.Element {
  const netInfo = useNetInfo();
  useEffect(() => {
    SplashScreen.hide();
    changeNavigationBarColor('transparent', true);
  }, []);

  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate
          loading={
            <>
              <LoadingModal isVisible />
              <View
                style={{
                  backgroundColor: COLORS.BG,
                  flex: 1,
                }}
              />
            </>
          }
          persistor={persistor}>
          <NavigationContainer>
            <StatusBar translucent backgroundColor="transparent" />
            {netInfo?.isConnected === null || netInfo?.isConnected ? (
              <Navigator />
            ) : (
              <NoConnectionScreen />
            )}
          </NavigationContainer>
          <Toast config={toastConfig} />
        </PersistGate>
      </ReduxProvider>
    </>
  );
}

export default App;
