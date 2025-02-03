import { UserInfo } from '@/common/types/UserInfo';

const IDENTIFY_TOOLKIT_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
const SECURE_TOKEN_BASE_URL = 'https://securetoken.googleapis.com/v1/token';
const FIREBASEWEB_API_KEY = process.env.FIREBASEWEB_API_KEY;

export const authSignUp = async (name: string, email: string, password: string) => {
  const signupEndPoint = `${IDENTIFY_TOOLKIT_BASE_URL}:signUp?key=${FIREBASEWEB_API_KEY}`;
  const response = await fetch(signupEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Sign up error: ${error.error.message}`);
  }

  const data = await response.json();
  const idToken = data.idToken;
  const profile = await authUpdateUserProfile(idToken, { displayName: name });
  const userInfo: UserInfo = {
    uid: data.localId,
    email: email,
    displayName: profile.displayName,
    token: data.idToken,
    refreshToken: data.refreshToken,
  };

  return userInfo;
};

export const authLogIn = async (email: string, password: string) => {
  if (!email.includes('@') || password.length < 8) {
    throw new Error('Invalid email or password');
  }

  const loginEndPoint = `${IDENTIFY_TOOLKIT_BASE_URL}:signInWithPassword?key=${FIREBASEWEB_API_KEY}`;
  const response = await fetch(loginEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Login error: ${error.error.message}`);
  }

  const data = await response.json();
  const idToken = data.idToken;
  const profile = await authGetUserProfile(idToken);

  const userInfo: UserInfo = {
    uid: data.localId,
    email: profile.users[0].email,
    displayName: profile.users[0].displayName,
    token: idToken,
    refreshToken: data.refreshToken,
  };
  return userInfo;
};

export const authRefreshToken = async (refreshToken: string) => {
  const refreshTokenEndPoint = `${SECURE_TOKEN_BASE_URL}?key=${FIREBASEWEB_API_KEY}`;
  const response = await fetch(refreshTokenEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Refresh Token error: ${error.error.message}`);
  }

  const data = await response.json();
  return {
    token: data.id_token,
    refreshToken: data.refresh_token,
  };
};

export const authUpdateUserProfile = async (
  idToken: string,
  profile: {
    displayName?: string;
    photoUrl?: string;
  }
) => {
  const updateEndPoint = `${IDENTIFY_TOOLKIT_BASE_URL}:update?key=${FIREBASEWEB_API_KEY}`;
  const response = await fetch(updateEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idToken,
      displayName: profile.displayName,
      photoUrl: profile.photoUrl,
      returnSecureToken: false,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Update user info error: ${error.error.message}`);
  }

  const data = await response.json();
  return data;
};

export const authGetUserProfile = async (idToken: string) => {
  const lookupEndPoint = `${IDENTIFY_TOOLKIT_BASE_URL}:lookup?key=${FIREBASEWEB_API_KEY}`;
  const response = await fetch(lookupEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Fetch user info error: ${error.error.message}`);
  }

  const data = await response.json();
  return data;
};

export const getUserIdFromToken = async (idToken: string) => {
  const profile = await authGetUserProfile(idToken);
  return profile.users[0].localId;
};
