"use client";

import { useUserState } from "@/common/states/UserState";
import { authServiceLogin, authServiceSignup } from "@/services/AuthService";

const login = async (email: string, password: string) => {
  const { setUserInfo } = useUserState.getState();
  const response = await authServiceLogin(email, password);
  if (response.result === "error") {
    console.error(response.message);
    return false;
  }
  if (!response.data) {
    console.error("No user info");
    return false;
  }
  const userInfo = response.data;
  setUserInfo(userInfo);
  return true;
};

const signup = async (name: string, email: string, password: string) => {
  const { setUserInfo } = useUserState.getState();
  const response = await authServiceSignup(name, email, password);
  if (response.result === "error") {
    console.error(response.message);
    return false;
  }
  if (!response.data) {
    console.error("No user info");
    return false;
  }
  const userInfo = response.data;
  setUserInfo(userInfo);
  return true;
};

const AuthController = {
  login,
  signup,
};

export default AuthController;
