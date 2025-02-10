import { NewProfile, UserState } from "../../types";
import { AppThunk } from "../../app/store";
import { createAppSlice } from "../../app/createAppSlice";
import { updateProfile } from "./userAPI";
import { authGetProfile } from "../auth/authSlice";

const initialState: UserState = {
    profile: {
        firstName: undefined,
        lastName: undefined,
    },
    status: "idle",
    error: undefined,
}

export const userSlice = createAppSlice({
    name: "user",
    initialState,
    reducers: create => ({
        userUpdateProfile: create.asyncThunk(
            async (newProfile: NewProfile) => {
                const response = await updateProfile(newProfile.token, newProfile.profile);
                return response;
            },
            {
                pending: state => {
                    state.status = "loading";
                },
                fulfilled: (state) => {
                    state.status = "idle";
                },
                rejected: (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message;
                },
            },
        ),
    }),
    selectors: {
    }
})

export const { userUpdateProfile } = userSlice.actions

export const updateProfileThunk =
    (newProfile: NewProfile): AppThunk =>
        async (dispatch) => {
            const response = await dispatch(userUpdateProfile(newProfile))
            dispatch(authGetProfile(newProfile.token))
            return(response);
        }