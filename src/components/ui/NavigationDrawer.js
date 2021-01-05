import React, {useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {name as appName} from '../../../package.json';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {scaleDp} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';
import {AppLogo} from 'components/ui/AppLogo';
import {logout} from 'redux-store/slices/loginSlice';
import {useDispatch} from 'react-redux';
import {AppText} from 'components/ui/AppText';
import {LogoutButton} from 'components/ui/LogoutButton';
import {UserProfileHeader} from 'components/ui/UserProfileHeader';

const {height, width} = Dimensions.get('screen');
export const NavigationDrawer = (props) => {
  return (
    <>
      <DrawerContentScrollView {...props} style={styles.drawerContainer}>
        <View style={styles.header}>
          <AppLogo />
          <UserProfileHeader />
        </View>
        <View
          style={{
            paddingTop: scaleDp(30),
            flex: 1,
          }}>
          <DrawerItemList
            {...props}
            activeBackgroundColor={theme.primaryLightColor}
            activeTintColor={theme.fontColor}
            itemStyle={styles.item}
            labelStyle={styles.itemLabel}
          />
        </View>
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
    paddingVertical: scaleDp(15),
    paddingLeft: scaleDp(10),
  },
  header: {
    marginLeft: scaleDp(10),
  },
  item: {
    marginRight: 0,
    paddingLeft: scaleDp(10),
    borderRadius: 0,
    borderTopLeftRadius: scaleDp(20),
    borderBottomLeftRadius: scaleDp(20),
  },
  itemLabel: {
    fontSize: scaleDp(13),
  },
  divider: {
    position: 'absolute',
    right: 0,
    height: 'auto',
    top: scaleDp(20),
    bottom: scaleDp(20),
    width: 1,
    backgroundColor: theme.disabled,
  },
  logoutContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: scaleDp(Platform.OS === 'web' ? 65 : 1),
  },
});
