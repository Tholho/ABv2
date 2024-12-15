import HeaderSignin from "./headerSignin"
import HeaderSignout from "./headerSignout"
import { useAppSelector } from "../app/hooks"
import { selectStatus } from "../features/login/loginSlice"
import { authClearToken, selectToken } from "../features/auth/authSlice"
import { Link } from "react-router"
import { useDispatch } from "react-redux"

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const token = useAppSelector(selectToken)
    const handleLogout = async () => {
        //console.log(token);
        await dispatch(authClearToken());
        //console.log(token);
    }
    //redux get state CONNECTED ?
    //subscribe
    // if connected
    // Sign = Sign out
    // else
    // Sign = Sign in
    //
    //  <HeaderSignin />
    //  <HeaderSignout />

    return (
        <header>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img
                        className="main-nav-logo-image"
                        src="./img/argentBankLogo.png"
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                {token ?

                    <div>
                        <Link className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>
                            Tony
                        </Link>
                        <Link onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }} className="main-nav-item" to="/">
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </Link>
                    </div>

                    :

                    <div>
                        <Link className="main-nav-item" to="/login">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </Link>
                    </div>
                }
            </nav>
        </header>
    )
}

export default Header