import React from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {theme} from 'constants/theme';
import {AppLogo} from 'components/ui/AppLogo';
import {LogoutButton} from 'components/ui/LogoutButton';
import {fonts} from 'constants/fonts';

const {width} = Dimensions.get('screen');
export const NavigationDrawer = (props) => {
  return (
    <>
      <DrawerContentScrollView {...props} style={styles.drawerContainer}>
        <View style={styles.header}>
          <AppLogo />
        </View>
        <DrawerItemList
          {...props}
          activeBackgroundColor={theme.primaryLightColor}
          activeTintColor={theme.white}
          inactiveTintColor={theme.fontColor}
          itemStyle={styles.item}
          labelStyle={styles.itemLabel}
        />
      </DrawerContentScrollView>
      <View style={styles.logoutContainer}>
        <LogoutButton />
      </View>
      {Platform.OS === 'web' && width > 800 && <View style={styles.divider} />}
    </>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingVertical: 15,
    paddingLeft: 10,
  },
  header: {
    marginVertical: 20,
    marginLeft: 10,
  },
  item: {
    marginRight: 0,
    paddingLeft: 10,
    borderRadius: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    fontFamily: fonts.regular,
  },
  itemLabel: {
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  divider: {
    position: 'absolute',
    right: 0,
    height: 'auto',
    top: 50,
    bottom: 50,
    width: 1,
    backgroundColor: theme.disabled,
  },
  logoutContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: Platform.OS === 'web' ? 65 : 1,
  },
  userHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primaryLightColor,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 5,
    alignSelf: 'center',
    marginVertical: 25,
    marginRight: 15,
  },
});
