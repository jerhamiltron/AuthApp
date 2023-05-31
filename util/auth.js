import axios from 'axios';

import {FIREBASE_API_KEY, FIREBASE_DYNAMIC_URL} from '@env';

const authenticate = async (mode, email, password) => {
  const tempURL = process.env.FIREBASE_DYNAMIC_URL.replace('[mode]', mode);
  const url = tempURL.replace('[API_KEY]', process.env.FIREBASE_API_KEY);

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
};

export const createUser = (email, password) => {
  return authenticate('signUp', email, password);
};

export const loginUser = (email, password) => {
  return authenticate('signInWithPassword', email, password);
};
