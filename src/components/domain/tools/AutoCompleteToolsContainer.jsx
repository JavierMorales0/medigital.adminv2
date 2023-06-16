import AutoCompleteInput from "@/components/ui/AutoCompleteInput.jsx";
import {useNavigate} from "react-router-dom";
import {useHookstate} from "@hookstate/core";
import ToolsService from "@/services/ToolsService.js";

const AutoCompleteToolsContainer = () => {
    const navigate = useNavigate()
    const search = useHookstate("")
    const suggestions = useHookstate([])
    const {data} = ToolsService()
    const handleComplete = () => {
        const sug = data.reduce((acc, item) => {
            //* Primero se evalua si hace match con el label y no tiene items
            if ((item.label.toLowerCase().includes(search.get().toLowerCase())
                    || item.description.toLowerCase().includes(search.get().toLowerCase()))
                && !item.items
            ) {
                return [...acc, item]
            }
            //* Si tiene items se evalua si hace match con el label o con el label de los items
            if (item.items) {
                const subMatch = [];
                item.items.map(subItem => {
                    if (subItem.label.toLowerCase().includes(search.get().toLowerCase()) ||
                        subItem.description.toLowerCase().includes(search.get().toLowerCase())
                    ) {
                        subMatch.push(subItem)
                    }
                })
                if (subMatch.length > 0) {
                    return [...acc, ...subMatch]
                }
            }
            return acc
        }, [])
        suggestions.set(sug)
    }

    const handleSelect = ({value}) => {
        const url = value.url
        navigate(url)
    }
    return (
        <AutoCompleteInput
            completeMethod={handleComplete}
            value={search.get()}
            suggestions={JSON.parse(JSON.stringify(suggestions.value))}
            field={"name"}
            onChange={(e) => search.set(e.target.value)}
            onSelect={handleSelect}
            forceSelection
            style={style}
            placeholder={"Buscar acciones"}
        />
    )
}

const style = {
    flex: 1,
    marginRight: '16px',
}

export default AutoCompleteToolsContainer;