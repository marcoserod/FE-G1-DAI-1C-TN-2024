import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';
import {COLORS} from '../../../constants/colors';
import {TabBar, TabView} from 'react-native-tab-view';

interface Props {
  title: string;
}

export const InfoTile = ({title, children}: PropsWithChildren<Props>) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoTile}>
        <Text style={styles.infoTitle}>{title}</Text>
        {children}
      </View>
    </View>
  );
};

export const InfoTabs = ({tabRoutes, renderScene}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(tabRoutes);
  const initialLayout = {width: Dimensions.get('window').width};
  return (
    <View style={styles.container}>
      <View style={styles.infoTile}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={styles.indicator}
              style={styles.tabbar}
              renderLabel={({route, focused}) => (
                <Text
                  style={{
                    ...styles.infoTitle,
                    ...{color: focused ? COLORS.TEXT : COLORS.TEXT_2},
                  }}>
                  {route.title}
                </Text>
              )}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
    borderRadius: 16,
  },
  infoTile: {
    opacity: 0.85,
    backgroundColor: `${COLORS.BG_2}`,
    borderRadius: 16,
    padding: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.TEXT,
    textAlign: 'left',
  },
  tabbar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  indicator: {
    backgroundColor: COLORS.PRIMARY,
  },
  label: {
    color: COLORS.TEXT,
  },
});
