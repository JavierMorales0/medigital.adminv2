import {ContextMenu} from "primereact/contextmenu";
import {Avatar} from "primereact/avatar";
import {getAuthUser} from "@/utils/LocalStorageUtils.js";
import {useRef} from "react";
import DialogChangeProfilePictureContainer from "@/components/domain/users/DialogChangeProfilePictureContainer.jsx";
import {useUIState} from "@/hooks/UIState.js";
import DialogViewProfileInfo from "@/components/domain/users/DialogViewProfileInfo.jsx";
import {useHookstate} from "@hookstate/core";
import AuthService from "@/services/AuthService.js";

const ProfileContainer = () => {
    const { logout} = AuthService();
    const {isVisibleChangeProfilePictureDialog, toogleChangeProfilePictureDialog} = useUIState();
    const cm = useRef(null);
    const isVisibleViewProfileInfoDialog = useHookstate(false)
    const items = [
        {
            label: "Ver perfil",
            icon: "pi pi-fw pi-search",
            command: () => {
                isVisibleViewProfileInfoDialog.set(true)
            },
        },
        {
            label: "Cambiar avatar",
            icon: "pi pi-fw pi-image",
            command: () => {
                toogleChangeProfilePictureDialog(true)
            },
        },
        {
            label: "Cerrar sesión",
            icon: "pi pi-fw pi-sign-out",
            command: () => {
                logout();
            }
        }
    ];

    const handleHideDialogChangeProfilePicture = () => {
        toogleChangeProfilePictureDialog(false)
    };

    return (
        <div>
            <Avatar
                image={getAuthUser().profilePicture}
                size="large"
                shape="circle"
                onContextMenu={(e) => cm.current.show(e)}
            />
            <ContextMenu model={items} ref={cm} breakpoint="767px"/>
            <DialogChangeProfilePictureContainer
                isVisible={isVisibleChangeProfilePictureDialog}
                handleHide={handleHideDialogChangeProfilePicture}
            />
            <DialogViewProfileInfo
                isVisible={isVisibleViewProfileInfoDialog.get()}
                handleHide={() => isVisibleViewProfileInfoDialog.set(false)}
            />
        </div>
    );
};

export default ProfileContainer;
