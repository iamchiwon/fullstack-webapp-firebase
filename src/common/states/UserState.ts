import { create } from 'zustand';
import { UserInfo } from '@/common/types/UserInfo';
import { persist } from 'zustand/middleware';

const EMPTY_USER_INFO: UserInfo = {
  uid: '',
  displayName: '',
  email: '',
  token: '',
  refreshToken: '',
};

interface UserState {
  uid: string;
  displayName: string;
  email: string;
  isLogin: boolean;

  token: string;
  refreshToken: string;

  setUserInfo: (credential: UserInfo) => void;
  setCredential: (credential: { token: string; refreshToken: string }) => void;
  logout: () => void;
}

export const useUserState = create<UserState>()(
  persist(
    (set) => ({
      uid: '',
      displayName: '',
      email: '',
      isLogin: false,
      token: '',
      refreshToken: '',

      setUserInfo: (credential) => {
        set({
          ...credential,
          isLogin: true,
        });
      },

      setCredential: (credential) => {
        set({
          ...credential,
        });
      },

      logout: () => {
        set({
          ...EMPTY_USER_INFO,
          isLogin: false,
        });
      },
    }),
    { name: 'UserState' }
  )
);
