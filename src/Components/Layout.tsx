import Header from "./header"
import Footer from "./footer"
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