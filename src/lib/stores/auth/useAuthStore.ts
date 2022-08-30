import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { authMode } from './constants';
import { AuthModeType } from './types';

interface UserInfo {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId: string;
  lastLoginAt: string | undefined;
}

interface AuthStore {
  currentUserInfo: UserInfo | null;
  mode: AuthModeType;
  userLogin: (currentUser: UserInfo) => void;
  updateMode: (currentMode: AuthModeType) => void;
  userLogout: () => void;
}
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        currentUserInfo: null,
        mode: authMode.GUEST_MODE,
        userLogin: currentUser => set(({ currentUserInfo }) => ({ currentUserInfo: { ...currentUser } })),
        updateMode: currentMode => set(({ mode }) => ({ mode: currentMode })),
        userLogout: () => set(({ currentUserInfo, mode }) => ({ currentUserInfo: null, mode: authMode.GUEST_MODE }))
      }),
      { name: 'currentUser' }
    )
  )
);
