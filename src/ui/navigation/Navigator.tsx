import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/home/HomeScreen';
import {COLORS} from '../../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../assets/localization/i18n';
import MovieDetailScreen from '../screens/movies/MovieDetails';
import {SearchScreen} from '../screens/search/SearchScreen';
import LoginScreen from '../screens/login/LoginScreen';
import {ProfileScreen} from '../screens/profile/Profile';

const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLORS.PRIMARY,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 16,
          paddingTop: 2,
        },
        tabBarStyle: {
          paddingTop: 4,
          backgroundColor: COLORS.BG_3,
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          tabBarLabel: I18n.t('tabs.home'),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: I18n.t('tabs.search'),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: I18n.t('tabs.profile'),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="MovieDetails" component={MovieDetailScreen} />
    </Stack.Navigator>
  );
};
