import * as admin from "firebase-admin";
import { credential } from "firebase-admin";
import { initializeApp, ServiceAccount } from "firebase-admin/app";

export const initFirebaseAdmin = async () => {
  if (admin.apps.length > 0) {
    return admin.apps[0];
  }

  const serviceAccountString = process.env.FIREBASEADMIN_CONFIG;
  if (!serviceAccountString) {
    throw new Error("FIREBASEADMIN_CONFIG is not set");
  }
  const serviceAccount: ServiceAccount = JSON.parse(serviceAccountString);

  const app = initializeApp({
    credential: credential.cert(serviceAccount),
  });
  return app;
};
