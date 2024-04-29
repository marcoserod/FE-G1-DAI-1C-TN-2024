import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import LoginScreen from './screens/login/LoginScreen';
import MovieDetailScreen from './screens/movies/MovieDetails';
import {Button} from './components/commons/Button';
import {COLORS} from '../constants/colors';
import {Chip} from './components/commons/Chip';
import IMAGES from '../assets/images';
import {MovieCard} from './components/movies/MovieCard';
import {MoviesGrid} from './layout/MoviesGrid';
import {HomeScreen} from './screens/home/HomeScreen';
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
