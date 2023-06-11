import {Helmet} from "react-helmet-async";
import { APP_TITLE} from "@/config/index.js";

const Page = ({title, children}) => {
    return (
        <div style={style.container}>
            <Helmet>
                <title>{ (title ?? '') + ' ' + APP_TITLE}</title>
            </Helmet>
            {children}
        </div>
    )
}

const style = {
    container: {
        padding: '16px 40px',
        position: 'relative',
    }
}

export default Page