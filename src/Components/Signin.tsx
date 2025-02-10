import { useDispatch } from "react-redux";
import { authGetProfile, authGetToken } from "../features/auth/authSlice";
import { useRef } from "react";
import { useNavigate } from "react-router";

export const SignIn: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Using refs allows us to easily get value from form input, which are then sent as HTML request payload
    const emailInputRef = useRef<null | HTMLInputElement>(null);
    const passwordInputRef = useRef<null | HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("handlesubmit called");
        if (emailInputRef == null || passwordInputRef == null) {
            alert("Erreur de formulaire");
            return;
        }
        else if (emailInputRef.current?.value == "" || passwordInputRef.current?.value == "") {
            alert("Merci de saisir vos identifiants");
            return;
        }
        const credentials = {
          email: emailInputRef.current?.value,
          password: passwordInputRef.current?.value,
        };
        //Sadly, the redux template for vite isn't completely elaborate regarding typing with actions, I did not bother coding a workaround because the UnknownAction type is explicit
        const dispatchResult = await dispatch(authGetToken(credentials));
        if (dispatchResult.payload?.status == "200") {
            dispatch(authGetProfile(dispatchResult.payload.body.token))
            navigate("/profile");
        }
        else {
            alert(dispatchResult.error.message)
        }
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