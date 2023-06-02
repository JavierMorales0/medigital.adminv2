import {FileUpload} from "primereact/fileupload";
import P16SemiBold from "@/components/ui/P16SemiBold.jsx";
import P12Regular from "@/components/ui/P12Regular.jsx";

const CustomFileUpload = ({handlerUpload}) => {
    const headerTemplate = (options) => {
        const {className, chooseButton, uploadButton, cancelButton} = options;

        return (
            <div
                className={className}
                style={{
                    backgroundColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "none",
                }}
            >
                <div>
                    {chooseButton}
                    {uploadButton}
                </div>
                {cancelButton}
            </div>
        );
    };
    const chooseOptions = {
        icon: "pi pi-fw pi-folder-open",
        iconOnly: false,
        className:
            "custom-choose-btn p-button-outlined p-button-secondary",
        label: "Elegir archivo",
    };
    const uploadOptions = {
        icon: "pi pi-fw pi-cloud-upload",
        iconOnly: false,
        label: 'Subir',
        className:
            "custom-upload-btn ",
    };
    const cancelOptions = {
        icon: "pi pi-fw pi-trash",
        iconOnly: true,
        className:
            "custom-cancel-btn p-button-danger",
    };

    const itemTemplate = (file, props) => {
        return (
            <div style={style.itemContainer}>
                <img alt={file.name} role="presentation" src={file.objectURL} width='100%' style={style.itemImage}/>
                <P16SemiBold>Tama&ntilde;o: {props?.formatSize}</P16SemiBold>
                <P12Regular>
                    La imagen ser&aacute; recortada a un cuadrado de 200x200px<br/>
                    Presione el bot&oacute;n <b>&quot;Subir&quot;</b> para guardar los cambios</P12Regular>
            </div>
        );
    };
    return (
        <FileUpload
            name="file"
            accept="image/*"
            maxFileSize={50000000}
            headerTemplate={headerTemplate}
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
            itemTemplate={itemTemplate}
            customUpload
            uploadHandler={handlerUpload}
        />
    )
}

const style = {
    itemContainer: {
        width: "100%",
        margin: "0",
        padding: "16px",
    },
    itemImage: {
        width: '100%',
        aspectRatio: '1/1',
        objectFit: 'cover',
    }
}

export default CustomFileUpload;