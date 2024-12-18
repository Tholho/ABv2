import { useDispatch, useSelector } from "react-redux";
import { authGetProfile, authGetToken, selectToken } from "../features/auth/authSlice";
import { useRef } from "react";
import { RootState } from "../app/store";
import { useNavigate } from "react-router";
import { useAppSelector } from "../app/hooks";
//import { unwrapResult } from "@reduxjs/toolkit";

export const SignIn: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailInputRef = useRef<null | HTMLInputElement>(null);
    const passwordInputRef = useRef<null | HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("handlesubmit called");
        if (emailInputRef == null || passwordInputRef == null) {
            alert("Erreur de formulaire");
            return;
        }
        else if (emailInputRef.current.value == "" || passwordInputRef.current.value == "") {
            alert("Merci de saisir vos identifiants");
            return;
        }
        const credentials = {
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
        };
        //console.log(credentials);
        const dispatchResult = await dispatch(authGetToken(credentials));
        const token = dispatchResult.payload.body.token;
        //console.log(dispatchresult.payload.status);
        if (dispatchResult.payload.status == "200") {
            console.log("dispatching token " + token)
            dispatch(authGetProfile(token))
            navigate("/profile");
          //  console.log("should navigate");
        } 
        //dispatchresult.unwrap() ? console.log("YES") : console.log("NO");
        //const unwrapresult = dispatchresult.unwrap();
      };
    return (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} >
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input ref={emailInputRef} type="text" id="username" />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input ref={passwordInputRef} type="password" id="password" />
                </div>
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button type="submit" className="sign-in-button">Sign In</button>
            </form>
        </section>
    )
}