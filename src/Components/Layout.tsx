import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router";


const Layout: React.FC= () => {
    return (
        <div className="layout">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;