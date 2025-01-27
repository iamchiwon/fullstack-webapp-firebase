"use server";

import {
  ActionResponseError,
  ActionResponseSuccess,
} from "@/common/types/ActionResponse";
import { UserInfo } from "@/common/types/UserInfo";
import { authLogIn, authSignUp } from "@/libs/firebase/auth";

export const authServiceLogin = async (email: string, password: string) => {
  try {
    const userInfo: UserInfo = await authLogIn(email, password);
    return ActionResponseSuccess<UserInfo>(userInfo);
  } catch (error) {
    return ActionResponseError<UserInfo>(error);
  }
};

export const authServiceSignup = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const userInfo: UserInfo = await authSignUp(name, email, password);
    return ActionResponseSuccess<UserInfo>(userInfo);
  } catch (error) {
    return ActionResponseError<UserInfo>(error);
  }
};
