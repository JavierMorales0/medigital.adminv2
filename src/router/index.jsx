import {BrowserRouter, Route, Routes} from "react-router-dom";
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
const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<LayoutPage/>}>
                <Route path="login" element={<AuthPage/>}/>
            </Route>
        </Routes>
    )
}