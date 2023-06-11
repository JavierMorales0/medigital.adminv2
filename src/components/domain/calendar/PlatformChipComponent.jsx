import {Chip} from "primereact/chip";
import P10SemiBold from "@/components/ui/P10SemiBold.jsx";
import {PLATFORMS} from "@/config/index.js";

const PlatformChipComponent = ({platform}) => {
    const style = {
        content: {
            backgroundColor: PLATFORMS[platform] === PLATFORMS.GOOGLE ? 'var(--green-200)' :
                                PLATFORMS[platform] === PLATFORMS.FACEBOOK ? 'var(--blue-200)' :
                                    PLATFORMS[platform] === PLATFORMS.NATIVE ? 'var(--cyan-200)' : 'var(--cyan-200)',
            padding: '4px 8px',
        },
        text: {
            padding: 0,
            margin: 0,
            textTransform: 'lowercase'
        }
    }
    const content = (
        <>
            <P10SemiBold sx={style.text} color='--gray-900'>{PLATFORMS[platform]}</P10SemiBold>
        </>
    )
    return (
        <Chip template={content} style={style.content}/>
    )
}

export default PlatformChipComponent;