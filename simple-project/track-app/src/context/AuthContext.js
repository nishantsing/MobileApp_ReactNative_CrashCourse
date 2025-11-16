import createDataContext from './createDataContext';
import trackerApi from '@/api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Stephen Grider pattern
const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signup':
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'signout':
      return { token: null, errorMessage: '' };
    case 'clear_error_message':
      return { ...state, errorMessage: '' }
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' })
}

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signup', payload: response.data.token });
  } catch (err) {
    // console.error(err.message);
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: response.data.token });
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
  }
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, signout, tryLocalSignin, clearErrorMessage },
  { token: null, errorMessage: '' }
);
