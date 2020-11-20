import debounce from 'lodash.debounce'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { InputCancelButton } from './buttons'
import { InputRegExOverlay } from './overlays'

interface SearchInputI {
    regex: string
    functionToDispatch: (query: string) => void
    loadingFunction?: () => void
    regexInfo: string
    autoFocus: boolean
}

export const SearchInputError: FC = () => {
    return (
        <p className="search_input_error">Sorry, try another word</p>
    )
}

export const SearchInput: FC<SearchInputI> = ({ regex, functionToDispatch, loadingFunction, regexInfo, autoFocus }) => {
    const dispatch = useDispatch()
    const rgx = new RegExp(regex)
    const searchInput = useRef() as React.MutableRefObject<HTMLInputElement>
    const [inputValue, setInputValue] = useState("")
    const [overlay, setOverlay] = useState(false)
    const [isShow, setIsShow] = useState(true)

    // overlay
    useEffect(() => { // need to listen every focus and blur on input and show or hide overlay
        if ( searchInput.current === document.activeElement ) {
            if (inputValue) {
                handleOverlay(false)
            } else if (!inputValue && isShow) {
                handleOverlay(true)
            }
        }
    })
    function handleOverlay(isShow: boolean) {
        if (isShow) {
            if (inputValue) {
                setOverlay(false)
            } else if (!inputValue && isShow) {
                setOverlay(true)
            }
        } else if (!isShow) {
            setOverlay(false)
            setIsShow(false)
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
    const clearInput = () => {
        setInputValue('')
        debouncedSave('')
        searchInput.current.focus()
    }
    
    return (
        <div className="seacrh_form mb-4" onSubmit={e => { e.preventDefault(); }}>
            <input
                autoFocus={autoFocus}
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
            {overlay && <InputRegExOverlay regexInfo={regexInfo}/>}
        </div>
    )
}