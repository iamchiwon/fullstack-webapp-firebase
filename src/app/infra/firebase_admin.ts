"use server";

import admin, { credential } from "firebase-admin";
import { initializeApp, ServiceAccount } from "firebase-admin/app";

const isInitialized = () => {
  return admin.apps.length > 0;
};

export const initFirebaseAdmin = async () => {
  if (isInitialized()) {
    return admin.app();
  }

  const serviceAccountString = process.env.FIREBASEADMIN_CONFIG;
  if (!serviceAccountString) {
    throw new Error("FIREBASEADMIN_CONFIG is not set");
  }
  const serviceAccount: ServiceAccount = JSON.parse(serviceAccountString);

  const app = initializeApp({
    credential: credential.cert(serviceAccount),
    storageBucket: "fullstack-webapp-firebase.firebasestorage.app",
  });
  return app;
};
