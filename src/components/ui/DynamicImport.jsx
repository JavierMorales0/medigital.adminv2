import {useEffect, useState} from "react";

const DynamicImport = ({load, children}) => {
    const [component, setComponent] = useState(null);

    useEffect(() => {
        let isMounted = true;
        load()
            .then((ComponentLoaded) => {
                if (isMounted) setComponent((component) => ComponentLoaded.default || component);
            })
            .catch(() => {
                setComponent(null)
            })
        return () => {
            isMounted = false;
        }
    }, [load]);

    return children(component);
}

export default DynamicImport;