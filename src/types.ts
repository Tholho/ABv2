export interface LoginCredentials {
    email: string | null
    password: string | null
};

export interface AuthState {
  loginCredentials: LoginCredentials
  isLogged: boolean
  token: string | null
  status: "idle" | "loading" | "failed"
  error: string | undefined
  profile: {
     firstName: string | null
     lastName: string | null
  }
}

export interface TokenResponse {
    token: string
}