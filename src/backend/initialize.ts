"use server";

import admin, { credential } from "firebase-admin";
import { initializeApp, ServiceAccount } from "firebase-admin/app";

const isInitialized = () => {
  return admin.apps.length > 0;
};

const getConfig = () => {
  const serviceAccountString = process.env.FIREBASEADMIN_CONFIG;
  if (!serviceAccountString) {
    throw new Error("FIREBASEADMIN_CONFIG is not set");
  }
  const serviceAccount: ServiceAccount = JSON.parse(serviceAccountString);
  return serviceAccount;
};

export const initFirebaseAdmin = async () => {
  if (isInitialized()) return;
  const cert = credential.cert(getConfig());
  initializeApp({ credential: cert });
};
