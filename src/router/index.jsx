import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { getToken} from "@/utils/LocalStorageUtils.js";
import DynamicImport from "@/components/ui/DynamicImport.jsx";

export default function Router() {
    return (
        <BrowserRouter>
            <RoutesApp/>
        </BrowserRouter>
    )
}

const LayoutPage = () => (
    <DynamicImport load={() => import('@/pages/LayoutPage')}>
        {(Component) => Component === null ? <p>Loading</p> : <Component/>}
    </DynamicImport>
)

const AuthPage = () => (
    <DynamicImport load={() => import('@/pages/AuthPage')}>
        {(Component) => Component === null ? <p>Loading</p> : <Component/>}
    </DynamicImport>
)

const DashboardPage = () => (
    <DynamicImport load={() => import('@/pages/DashboardPage')}>
        {(Component) => Component === null ? <p>Loading</p> : <Component/>}
    </DynamicImport>
)

const ProtectedAuthRoute = ({redirectPath = "/login", children }) => {
    const token = getToken() || null;
    if(!token) return <Navigate to={redirectPath} replace/>
    return children
}

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<LayoutPage/>}>
                <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                <Route path="login" element={<AuthPage/>}/>
                <Route path="dashboard"
                       element={
                           <ProtectedAuthRoute>
                               <DashboardPage/>
                           </ProtectedAuthRoute>
                       }
                />
            </Route>
        </Routes>
    )
}