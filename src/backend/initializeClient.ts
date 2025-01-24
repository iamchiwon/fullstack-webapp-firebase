"use server";

import { getApps, initializeApp } from "firebase/app";

const _isInitialized = () => {
  return getApps().length > 0;
};

const _getConfig = () => {
  const clientConfigString = process.env.FIREBASECLIENT_CONFIG;
  if (!clientConfigString) {
    throw new Error("FIREBASECLIENT_CONFIG is not set");
  }
  const clientConfig = JSON.parse(clientConfigString);
  return clientConfig;
};

const _initFirebaseClient = async () => {
  const config = _getConfig();
  initializeApp(config);
};

export const ensureFirebaseClientInitialized = async () => {
  if (!_isInitialized()) {
    await _initFirebaseClient();
  }
};
