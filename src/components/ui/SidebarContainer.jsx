import LogoutButton from "@/components/domain/auth/LogoutButton.jsx";
import ToolsMenu from "@/components/ui/ToolsMenu.jsx";

const SidebarContainer = () => {
    return (
        <div style={style.container}>
            <div style={style.profile}>
                <span>MEDIGITAL</span>
                <span style={style.profile.primaryText}>.admin</span>
            </div>
            <div style={style.tools}>
                <ToolsMenu/>
            </div>
            <div style={style.actions}>
                <LogoutButton/>
            </div>
        </div>
    )
}

const style = {
    container: {
        maxWidth: '250px',
        width: '250px',
        minWidth: '250px',
        height: '100%',
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
        display: 'flex',
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