import { useState, useRef } from "react";
import { useAppSelector } from "../app/hooks";
import { selectProfile, selectToken } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { NewProfile, UserProfile } from "../types";
import { updateProfileThunk, userUpdateProfile } from "../features/user/userSlice";
import { useNavigate } from "react-router";

export const UserName: React.FC = () => {
    const currentProfile = useAppSelector(selectProfile);
    const token = useAppSelector(selectToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const firstNameInputRef = useRef<null | HTMLInputElement>(null);
    const lastNameInputRef = useRef<null | HTMLInputElement>(null);

    const [isEditing, setIsEditing] = useState(false);
    const onEdit = () => {
        setIsEditing(true);
    }
    const onCancel = () => {
        setIsEditing(false);
    }

    const onSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            console.log("onsubmit called");
            if (firstNameInputRef == null || lastNameInputRef == null) {
                alert("Erreur de formulaire");
                return;
            }
            else if (firstNameInputRef.current?.value == "" || lastNameInputRef.current?.value == "") {
                alert("Merci de saisir votre nom");
                return;
            }
            const newProfile : NewProfile = {
                token: token,
                profile: {
                    firstName: firstNameInputRef.current?.value,
                    lastName: lastNameInputRef.current?.value,
                },
            };
            //console.log(credentials);
            const dispatchResult = await dispatch(updateProfileThunk(newProfile));
            setIsEditing(false);
            const dispatchPayload = dispatchResult.payload;
            //console.log(dispatchresult.payload.status);
            if (dispatchResult.payload.status == "200") {
                //console.log("dispatching token " + token)
                console.log(dispatchPayload);
                //dispatch(authGetProfile(token))
                navigate("/profile");
              //  console.log("should navigate");
            } 
       
          //dispatchresult.unwrap() ? console.log("YES") : console.log("NO");
            //const unwrapresult = dispatchresult.unwrap();
          };

    return (
        <div className="header">
            {isEditing ?
                <form className="edit-name-form">
                    <h1>Welcome back</h1>
                    <div className="flex-center input-names">
                        <input ref={firstNameInputRef} className="input-names" type="text" id="editFirstName" placeholder={currentProfile.firstName}></input>
                        <input ref={lastNameInputRef} className="input-names" type="text" id="editLastName" placeholder={currentProfile.lastName}></input>
                    </div>
                    <div className="flex-center edit-name-buttons">
                        <button onClick={onSubmit} className="input-names edit-button">Save</button>
                        <button onClick={onCancel} className="input-names edit-button">Cancel</button>
                    </div>
                </form>
                :
                <>
                    <h1>Welcome back<br />{currentProfile.firstName} {currentProfile.lastName}!</h1>
                    <button onClick={onEdit} className="edit-button">Edit Name</button>
                </>
            }
        </div>
    )
}

export default UserName

/*
<div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input ref={emailInputRef} type="text" id="username" />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input ref={passwordInputRef} type="password" id="password" />
                </div>
                */