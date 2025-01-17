"use server";

import { credential } from "firebase-admin";
import { initializeApp, ServiceAccount } from "firebase-admin/app";

export const initFirebaseAdmin = async () => {
  const serviceAccountString = process.env.FIREBASEADMIN_CONFIG;
  if (!serviceAccountString) {
    throw new Error("FIREBASEADMIN_CONFIG is not set");
  }
  const serviceAccount: ServiceAccount = JSON.parse(serviceAccountString);

  initializeApp({
    credential: credential.cert(serviceAccount),
  });
};
