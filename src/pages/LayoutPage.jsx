import {Outlet, useLocation} from "react-router-dom";
import SidebarContainer from "@/components/ui/SidebarContainer.jsx";
import NavbarContainer from "@/components/ui/NavbarContainer.jsx";

const LayoutPage = () => {
    const {pathname} = useLocation()

    return (<>
            <main style={style.container}>
                {pathname !== '/login' && (<SidebarContainer/>)}
                <section style={style.body}>
                    <NavbarContainer/>
                    <Outlet/>
                </section>
            </main>
        </>)
}

const style = {
    container: {
        display: 'flex',
    }, body: {
        padding: '16px',
        flex: 1
    }
}
export default LayoutPage;