import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IMAGES from '../../../assets/images';

import I18n from '../../../assets/localization/i18n';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useLoginMutation} from '../../../services/auth';
import {useDispatch} from 'react-redux';
import {setCredentials} from '../../../store/authSlice';
import {LoadingModal} from '../../components/commons/modal/LoadingModal';

GoogleSignin.configure({
  webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
  scopes: ['profile', 'email'],
});

const LoginScreen = () => {
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const {userId, moviePlayToken, refreshToken} = await login(
        idToken,
      ).unwrap();
      dispatch(
        setCredentials({
          userId,
          moviePlayToken,
          refreshToken,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <LoadingModal isVisible={isLoading} />
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image source={IMAGES.OTHERS.LOGO_NAME} style={styles.logo} />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={signIn}>
          <IMAGES.SVG.GOOGLE width={24} height={24} />
          <Text style={styles.loginButtonText}>{I18n.t('google.SSO')}</Text>
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={IMAGES.OTHERS.LOGIN_BG}
        style={styles.backgroundImage}>
        <LinearGradient
          colors={['transparent', '#1C1C1C']}
          style={styles.gradientOverlay}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#1C1C1C',
  },
  backgroundImage: {
    resizeMode: 'contain',
    height: '75%',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '75%',
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    top: '-20%',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'center',
    marginTop: 'auto',
    marginBottom: 60,
  },
  logo: {
    resizeMode: 'contain',
  },
  loginButton: {
    flexDirection: 'row',
    columnGap: 12,
    backgroundColor: '#8D0000',
    marginHorizontal: 32,
    paddingVertical: 15,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LoginScreen;
