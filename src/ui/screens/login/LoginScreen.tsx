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
import {useNavigation} from '@react-navigation/native';

import I18n from '../../../assets/localization/i18n';

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={IMAGES.OTHERS.LOGIN_BG}
        style={styles.backgroundImage}>
        <LinearGradient
          colors={['transparent', '#1C1C1C']}
          style={styles.gradientOverlay}
        />
      </ImageBackground>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image source={IMAGES.OTHERS.LOGO_NAME} style={styles.logo} />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Home')}>
          <IMAGES.SVG.GOOGLE width={24} height={24} />
          <Text style={styles.loginButtonText}>{I18n.t('google.SSO')}</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1.5,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 'auto',
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
    backgroundColor: '#8D0000', // Google's red color
    marginHorizontal: 32,
    marginBottom: 132,
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
