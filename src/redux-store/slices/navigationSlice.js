import {createSlice} from '@reduxjs/toolkit';
import {NavigationState} from '@react-navigation/native';

const initialState = {
  state: {
    type: '',
    key: '',
    routeNames: [],
    routes: [],
    index: 0,
    stale: false,
  },
};

const slice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    changeNavigationState: (state, action) => {
      state.state = action.payload;
    },
  },
});

export default slice.reducer;
export const {changeNavigationState} = slice.actions;

export const selectSavedNavigationState = (state) => state.navigation.state;
