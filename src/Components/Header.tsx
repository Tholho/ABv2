import { useAppSelector } from "../app/hooks"
import { authClearToken, selectProfile, selectToken } from "../features/auth/authSlice"
import { Link } from "react-router"
import { useDispatch } from "react-redux"

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const currentProfile = useAppSelector(selectProfile);
    const token = useAppSelector(selectToken)

    const handleLogout = async () => {
        await dispatch(authClearToken());
    }

    // renders a different header according to user connection status which relies on token presence
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
                            {currentProfile.firstName}
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