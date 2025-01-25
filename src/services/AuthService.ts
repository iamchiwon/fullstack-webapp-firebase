"use server";

import { UserInfo } from "@/common/types/UserInfo";
import { authLogIn, authSignUp } from "@/libs/firebase/auth";

export const authServiceLogin = async (email: string, password: string) => {
  try {
    const userInfo: UserInfo = await authLogIn(email, password);
    return {
      result: "success",
      data: userInfo,
    };
  } catch (error) {
    return {
      result: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const authServiceSignup = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const userInfo: UserInfo = await authSignUp(name, email, password);
    return {
      result: "success",
      data: userInfo,
    };
  } catch (error) {
    return {
      result: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
