import {AutoComplete} from 'primereact/autocomplete';

const AutoCompleteTools = ({
                               completeMethod,
                               value,
                               suggestions,
                               field,
                               onChange,
                               onSelect,
                               forceSelection = false,
                               style = {},
                               placeholder = ""
                           }) => {
    return (
        <AutoComplete placeholder={placeholder} completeMethod={completeMethod} value={value}
                      suggestions={suggestions} field={field}
                      onChange={onChange}
                      onSelect={onSelect}
                      forceSelection={forceSelection}
                      style={style}/>
    )
}

export default AutoCompleteTools;