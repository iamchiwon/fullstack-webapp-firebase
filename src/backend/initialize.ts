"use server";

import admin from "firebase-admin";
import { type ServiceAccount } from "firebase-admin/app";

const _isInitialized = () => {
  return admin.apps.length > 0;
};

const _getConfig = () => {
  const serviceAccountString = process.env.FIREBASEADMIN_CONFIG;
  if (!serviceAccountString) {
    throw new Error("FIREBASEADMIN_CONFIG is not set");
  }
  const serviceAccount: ServiceAccount = JSON.parse(serviceAccountString);
  return serviceAccount;
};

const _initFirebaseAdmin = async () => {
  const config = _getConfig();
  const cert = admin.credential.cert(config);
  admin.initializeApp({ credential: cert });
};

export const ensureFirebaseInitialized = async () => {
  if (!_isInitialized()) {
    await _initFirebaseAdmin();
  }
};
