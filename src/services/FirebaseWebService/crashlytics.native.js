import crashlytics from '@react-native-firebase/crashlytics';

export default {
  logUser: async user => {
    await Promise.all([
      crashlytics().setUserId(user.id),
      crashlytics().setAttributes({
        role: user.role,
        email: user.email,
        name: user.name,
      }),
    ]);
  },
  ...crashlytics,
};
