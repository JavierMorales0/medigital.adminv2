import LoginButton from "@/components/domain/auth/LoginButton.jsx";
import ToolsMenu from "@/components/ui/ToolsMenu.jsx";

const SidebarContainer = () => {
    return (
        <div style={style.container}>
            <div style={style.profile}>
                <span>MEDIGITAL</span>
                <span style={style.profile.primaryText}>.admin</span>
            </div>
            <ToolsMenu/>
            <div style={style.actions}>
                <LoginButton/>
            </div>
        </div>
    )
}

const style = {
    container: {
        width: '250px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflowY: 'auto',
        boxShadow: '3px 0px 28px -7px var(--highlight-bg)',
        padding: '64px 16px'
    },
    profile: {
        fontSize: '24px',
        dioplay: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        primaryText: {
            color: 'var(--highlight-text-color)',
            fontWeight: 600,
            fontSize: '16px'
        }
    },
    tools: {}, actions: {}
}

export default SidebarContainer