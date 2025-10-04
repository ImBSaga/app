// Types
export type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
  isLoading: boolean;
};

// Register
export type RegisterResponse = {
  success: boolean;
  message: string;
  data: User;
};

// Login
export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
};
