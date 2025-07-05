import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  name: string;
  companyName: string;
  image?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  clearAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) =>
        set(() => ({
          user,
          isAuthenticated: !!user,
        })),

      setToken: (token) =>
        set(() => ({
          token,
        })),

      setLoading: (isLoading) =>
        set(() => ({
          isLoading,
        })),

      login: (user, token) =>
        set(() => ({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        })),

      logout: () =>
        set(() => ({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })),

      clearAuth: () =>
        set(() => ({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })),
    }),
    {
      // localStorage 키 이름
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
