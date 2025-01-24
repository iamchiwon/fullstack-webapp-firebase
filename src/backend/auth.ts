/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import admin from "firebase-admin";
import { ensureFirebaseAdminInitialized } from "./initializeAdmin";
import { ensureFirebaseClientInitialized } from "./initializeClient";
import { getApp } from "firebase/app";
import { getAuth as _getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserInfo } from "@/common/types/UserInfo";

const getAuth = async () => {
  await ensureFirebaseAdminInitialized();
  return admin.auth();
};

const getClientAuth = async () => {
  await ensureFirebaseClientInitialized();
  const app = getApp();
  const auth = await _getAuth(app);
  return auth;
};

export const authSignUp = async (
  name: string,
  email: string,
  password: string
) => {
  const auth = await getAuth();
  const userRecord = await auth.createUser({
    email,
    password,
    displayName: name,
  });
  const uid = userRecord.uid;
  return { uid };
};

export const authLogIn = async (email: string, password: string) => {
  if (!email.includes("@") || password.length < 8) {
    throw new Error("Invalid email or password");
  }

  const auth = await getClientAuth();
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  const uid = user.uid;
  const userEmail = user.email;
  const displayName = user.displayName;
  const idToken = await user.getIdToken();
  const refreshToken = user.refreshToken;

  const userInfo: UserInfo = {
    uid,
    email: userEmail ?? "",
    displayName: displayName ?? "",
    token: idToken,
    refreshToken: refreshToken,
  };

  return userInfo;
};

export const authRefreshToken = async (refreshToken: string) => {
  const FIREBASE_API_KEY = process.env.FIREBASEWEB_API_KEY;

  const response = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    }
  );

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
