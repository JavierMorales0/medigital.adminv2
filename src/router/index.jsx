import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { getToken} from "@/utils/LocalStorageUtils.js";
import DynamicImport from "@/components/ui/DynamicImport.jsx";
import AuthPageSkeleton from "@/components/ui/skeletons/AuthPageSkeleton.jsx";
import DashboardPageSkeleton from "@/components/ui/skeletons/DashboardPageSkeleton.jsx";

export default function Router() {
    return (
        <BrowserRouter>
            <RoutesApp/>
        </BrowserRouter>
    )
}

const LayoutPage = () => (
    <DynamicImport load={() => import('@/pages/LayoutPage')}>
        {(Component) => Component === null ? <></> : <Component/>}
    </DynamicImport>
)

const AuthPage = () => (
    <DynamicImport load={() => import('@/pages/AuthPage')}>
        {(Component) => Component === null ? <AuthPageSkeleton/> : <Component/>}
    </DynamicImport>
)

const DashboardPage = () => (
    <DynamicImport load={() => import('@/pages/DashboardPage')}>
        {(Component) => Component === null ? <DashboardPageSkeleton/> : <Component/>}
    </DynamicImport>
)

const CalendarPage = () => (
    <DynamicImport load={() => import('@/pages/CalendarPage')}>
        {(Component) => Component === null ? <p>Loading</p> : <Component/>}
    </DynamicImport>
)

const ConsultingRoomPage = () => (
    <DynamicImport load={() => import('@/pages/ConsultingRoomPage.jsx')}>
        {(Component) => Component === null ? <p>Loading</p> : <Component/>}
    </DynamicImport>
)

const WaitingRoomPage = () => (
    <DynamicImport load={() => import('@/pages/WaitingRoomPage')}>
        {(Component) => Component === null ? <p>Loading</p> : <Component/>}
    </DynamicImport>
)

const NewConsultPage = () => (
    <DynamicImport load={() => import('@/pages/NewConsultPage')}>
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
                       element={<ProtectedAuthRoute><DashboardPage/></ProtectedAuthRoute>}
                />
                <Route path="calendario"
                       element={<ProtectedAuthRoute><CalendarPage/></ProtectedAuthRoute>}
                />
                <Route path="consultorio"
                       element={<ProtectedAuthRoute><ConsultingRoomPage/></ProtectedAuthRoute>}
                />
                <Route path="sala-de-espera"
                       element={<ProtectedAuthRoute><WaitingRoomPage/></ProtectedAuthRoute>}>
                    <Route path="nueva" element={<ProtectedAuthRoute><NewConsultPage/></ProtectedAuthRoute>}/>
                </Route>
            </Route>
        </Routes>
    )
}