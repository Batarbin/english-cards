import debounce from "lodash.debounce"
import React, { FC, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Overlay } from "./overlays"

interface InputCancelButtonI {
    clearFunction: () => void
}
interface SearchInputI {
    regex: string
    functionToDispatch: (query: string) => void
    loadingFunction?: () => void
    overlayText: string
}

const InputCancelButton: FC<InputCancelButtonI> = ({ clearFunction }) => {
    return (
        <span className="input_clear_button" onClick={clearFunction}>&times;</span>
    )
}
export const SearchInput: FC<SearchInputI> = ({ regex, functionToDispatch, loadingFunction, overlayText }) => {
    const dispatch = useDispatch()
    const rgx = new RegExp(regex)
    const searchInput = useRef(null)
    const [inputValue, setInputValue] = useState("")
    const [overlay, setOverlay] = useState(false)

    // overlay
    useEffect(() => { // need to listen every focus and blur on input and show or hide overlay
        if ( searchInput.current === document.activeElement ) {
            if (inputValue) {
                handleOverlay(false)
            } else if (!inputValue) {
                handleOverlay(true)
            }
        }
    })
    function handleOverlay(isShow: boolean) {
        if (isShow) {
            if (!inputValue) {
                setOverlay(true)
            } else if (inputValue) {
                setOverlay(false)
            }
        } else if (!isShow) {
            setOverlay(false)
        }
    }

    // debounce, onChangeEvent and clear function
    const debouncedSave = useRef(debounce(nextValue => dispatch(functionToDispatch(nextValue)), 600))
            .current
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value: nextValue } = e.target
        nextValue = nextValue.replace(rgx, "")
        nextValue = nextValue.replace(/\s{2}/g, " ")
        setInputValue(nextValue)
        if (loadingFunction) { // to set up spinner if action is without fetch or not not async
            dispatch(loadingFunction())
        }
        debouncedSave(nextValue)
    }
    function clearInput() {
        setInputValue('')
        debouncedSave('')
    }
    
    return (
        <div className="seacrh_form mb-4" onSubmit={e => { e.preventDefault(); }}>
            <input
                ref={searchInput}
                className="seacrh_input"
                type="text"
                autoComplete="off"
                name="word"
                placeholder="Type a word"
                value={inputValue}
                onChange={handleChange}
                onFocus={() => handleOverlay(true)}
                onBlur={() => handleOverlay(false)}
            />
            {inputValue && <InputCancelButton clearFunction={clearInput}/>}
            {overlay && <Overlay type={'regex'} overlayText={overlayText}/>}
        </div>
    )
}