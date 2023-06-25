import {Outlet, useLocation} from "react-router-dom";
import SidebarContainer from "@/components/ui/SidebarContainer.jsx";
import NavbarContainer from "@/components/ui/NavbarContainer.jsx";
import {useUIState} from "@/hooks/UIState.js";
import LoadingSpinner from "@/components/ui/LoadingSpinner.jsx";
import {Toaster} from "react-hot-toast";
import NewConsultContainer from "@/components/domain/waitingRoom/NewConsultContainer.jsx";

const LayoutPage = () => {
    const {pathname} = useLocation();
    const ui = useUIState();

    //* Verify if is auth route to show or hide components
    const isAuthRoute = () => {
        return pathname === "/login";
    };

    return (
        <main style={style.container}>
            {!isAuthRoute() && <SidebarContainer/>}
            <section style={style.body}>
                {!isAuthRoute() && <NavbarContainer/>}
                <Outlet/>
            </section>
            {ui?.isLoadingForeground && <LoadingSpinner/>}
            <Toaster
                toastOptions={{
                    style: {background: 'var(--surface-100)', color: 'var(--surface-900)'},
                }}
            />

            {/*
                DIALOGS GLOBALES
            */}
            <NewConsultContainer/>
        </main>
    );
};

const style = {
    container: {
        display: "flex",
        height: "100vh",
    },
    body: {
        flexGrow: 1,
        flexShrink: 1,
        minWidth: 0,
        overflowY: "auto",
    },
};
export default LayoutPage;
