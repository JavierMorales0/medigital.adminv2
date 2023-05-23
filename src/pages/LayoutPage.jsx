import {Outlet, useLocation} from "react-router-dom";
import SidebarContainer from "@/components/ui/SidebarContainer.jsx";
import NavbarContainer from "@/components/ui/NavbarContainer.jsx";

const LayoutPage = () => {
    const {pathname} = useLocation()

    //* Verify if is auth route to show or hide components
    const isAuthRoute = () => {
        return pathname === '/login'
    }

    return (
        <main style={style.container}>
            {!isAuthRoute() && (<SidebarContainer/>)}
            <section style={style.body}>
                {!isAuthRoute() && <NavbarContainer/>}
                <Outlet/>
            </section>
        </main>
    )
}

const style = {
    container: {
        display: 'flex',
        height: '100vh',
    }, body: {
        padding: '16px',
        flex: 1,
    }
}
export default LayoutPage;