import { createAppSlice } from "../../app/createAppSlice";
import { LoginCredentials, AuthState } from "../../types";
import { fetchProfile, fetchToken } from "./authAPI";

const initialState: AuthState = {
    loginCredentials: {
        email: "",
        password: "",
    },
    isLogged: false,
    token: null,
    status: "idle",
    error: undefined,
    profile: {
        firstName: undefined,
        lastName: undefined,
    }
}

export const authSlice = createAppSlice({
    name: "auth",
    initialState,
    reducers: create => ({
        authClearToken: create.reducer(state => {
            state.token = null;
        }),
        authGetToken: create.asyncThunk(
            async (credentials: LoginCredentials) => {
                console.log(credentials)
                const token = await fetchToken(credentials);
                return token;
            },
            {
                pending: state => {
                  state.status = "loading";
                },
                fulfilled: (state, action) => {
                  state.status = "idle";
                  state.token = action.payload.body.token;
                  console.log(state.token)
                },
                rejected: (state, action) => {
                  state.token = "";
                  state.status = "failed";
                  
                  state.error = action.error.message;
                },
              },
        ),
        authGetProfile: create.asyncThunk(
            async (token: string) => {
                const profile = await fetchProfile(token);
                return profile;
            },
            {
                pending: state => {
                  state.status = "loading";
                },
                fulfilled: (state, action) => {
                  state.status = "idle";
                  state.profile.firstName = action.payload.body.firstName;
                  state.profile.lastName = action.payload.body.lastName;
                },
                rejected: (state, action) => {
                  state.status = "failed";
                  state.error = action.error.message;
                },
              },
        )
    }),
    selectors: {
        selectStatus: auth => auth.status,
        selectToken: auth => auth.token,
        selectProfile: auth => auth.profile
      },
})

export const { authGetToken, authClearToken, authGetProfile } = authSlice.actions

export const { selectStatus, selectToken, selectProfile } = authSlice.selectors