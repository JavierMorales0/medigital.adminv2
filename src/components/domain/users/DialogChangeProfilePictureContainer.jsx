import {Dialog} from "primereact/dialog";
import UsersService from "@/services/UsersService.js";
import CustomFileUpload from "@/components/ui/CustomFileUpload.jsx";

const DialogChangeProfilePictureContainer = ({isVisible, handleHide}) => {
    const {changeProfilePicture} = UsersService();
    const handlerUpload = (event) => {
        const file = event.files[0];
        const formData = new FormData();
        formData.append("file", file);
        changeProfilePicture.mutate(formData);
    };

    return (
        <Dialog
            header={`Actualizar fotografia`}
            visible={isVisible}
            style={style.dialogContainer}
            onHide={handleHide}
            draggable={true}
            resizable={false}
        >
            <CustomFileUpload handlerUpload={handlerUpload}/>
        </Dialog>
    );
};


const style = {
    dialogContainer: {width: "500px"},
    itemContainer: {
        width: "100%",
        margin: "0",
        padding: "0 16px",
    },
    itemImage: {
        width: '100%',
        aspectRatio: '1/1',
        objectFit: 'cover',
    }
}
export default DialogChangeProfilePictureContainer;
