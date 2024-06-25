import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

type Auth = {
  users: User[];
  currentUser: User | null;
  login: (email: string, password: string) => User | null;
  signUp: (email: string, password: string, name: string) => User | null;
  logout: () => void;
};

export const useAuthState = create<Auth>((set, get) => ({
  users: [],
  currentUser: null,
  login: (email, password) => {
    const { users } = get();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      set({ currentUser: user });
      return user;
    }
    throw new Error("Usuário não encontrado ou senha incorreta");
  },
  signUp: (email, password, name) => {
    let newUser = null;
    set((state) => {
      const userExists = state.users.some((user) => user.email === email);
      if (userExists) throw new Error("Usuário já cadastrado");

      newUser = {
        id: Math.random().toString(),
        email,
        password,
        name,
      };
      state.users.push(newUser);
      state.currentUser = newUser;
      return { ...state };
    });
    return newUser;
  },
  logout: () => {
    set((state) => {
      state.currentUser = null;
      return { ...state };
    });
  },
}));
