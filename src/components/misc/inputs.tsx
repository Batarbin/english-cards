import debounce from "lodash.debounce"
import React, { FC, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Input } from "reactstrap"

interface SearchInputI {
    regex: string
    functionToDispatch: (query: string) => void
    loadingFunction?: () => void
}

export const SearchInput: FC<SearchInputI> = ({ regex, functionToDispatch, loadingFunction }) => {
    const dispatch = useDispatch()
    const rgx = new RegExp(regex)
    const [value, setValue] = useState("")
    const debouncedSave = useRef(debounce(nextValue => dispatch(functionToDispatch(nextValue)), 600))
            .current
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value: nextValue } = e.target
        nextValue = nextValue.replace(rgx, "")
        nextValue = nextValue.replace(/\s{2}/g, " ")
        setValue(nextValue)
        if (loadingFunction) {
            dispatch(loadingFunction())
        }
        debouncedSave(nextValue)
    }
    function clearInput() {
        setValue('')
        debouncedSave('')
    }

    return (
        <div className="seacrh_form mb-4" onSubmit={e => { e.preventDefault(); }}>
            <Input
                type="text"
                autoComplete="off"
                name="word"
                placeholder="Type a word"
                bsSize="lg"
                value={value}
                onChange={handleChange}
            />
            {value && <span id="search_clear_button" onClick={clearInput}>&times;</span>}
        </div>
    )
}