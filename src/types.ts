export interface LoginCredentials {
    email: string | undefined | null
    password: string | undefined | null
};

export interface UserProfile {
    firstName: string | undefined
    lastName: string | undefined
}

export interface NewProfile {
    token: string | null
    profile: UserProfile
}

export interface AuthState {
  loginCredentials: LoginCredentials
  token: string | null
  status: "idle" | "loading" | "failed"
  error: string | undefined
  profile: UserProfile
}

export interface TokenResponse {
    token: string
}

export interface UserState {
    profile: UserProfile
    status: "idle" | "loading" | "failed"
    error: string | undefined
}