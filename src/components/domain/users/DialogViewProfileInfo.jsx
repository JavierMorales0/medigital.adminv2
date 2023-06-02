import {Dialog} from "primereact/dialog";
import UsersService from "@/services/UsersService.js";
import {InputText} from "primereact/inputtext";
import P12Regular from "@/components/ui/P12Regular.jsx";
import P16SemiBold from "@/components/ui/P16SemiBold.jsx";

const DialogViewProfileInfo = ({isVisible, handleHide}) => {
    const {ownInfo, isLoadingOwnInfo} = UsersService();

    if (!isLoadingOwnInfo) {
        return (<Dialog
                header={`Información de perfil`}
                visible={isVisible}
                style={style.dialogContainer}
                onHide={handleHide}
                draggable={true}
                resizable={false}
            >
                <form style={style.container}>
                    <div style={style.row1}>
                        <img src={ownInfo?.user?.profile_picture} alt="Avatar" width="150px" height="150px"/>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="username">Usuario</label>
                            <InputText id="username" value={ownInfo?.user?.username} readOnly={true}/>
                        </div>
                    </div>

                </form>
            </Dialog>
        )
    }
}

const style = {
    dialogContainer: {
        width: "650px"
    },
    container: {
        padding: '16px',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    row1: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    }
}

export default DialogViewProfileInfo;