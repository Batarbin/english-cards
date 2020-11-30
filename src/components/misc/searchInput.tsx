import debounce from 'lodash.debounce'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetSearchInputValue } from '../../actions/searchInputActions'
import { RootStore } from '../../app/store'
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
    const dictionaryState = useSelector((state: RootStore) => state.searchInputState)
    const { searchInputValue } = dictionaryState
    const rgx = new RegExp(regex)
    const searchInput = useRef() as React.MutableRefObject<HTMLInputElement>
    const [overlay, setOverlay] = useState(false)
    const [isShow, setIsShow] = useState(true)

    // overlay
    useEffect(() => { // need to listen every focus and blur on input and show or hide overlay
        if ( searchInput.current === document.activeElement ) {
            if (searchInputValue) {
                handleOverlay(false)
            } else if (!searchInputValue && isShow) {
                handleOverlay(true)
            }
        }
    })
    function handleOverlay(isShow: boolean) {
        if (isShow) {
            if (searchInputValue) {
                setOverlay(false)
            } else if (!searchInputValue && isShow) {
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
        dispatch(GetSearchInputValue(nextValue))
        if (loadingFunction) { // to set up spinner if action is without fetch or not not async
            dispatch(loadingFunction())
        }
        debouncedSave(nextValue)
    }
    const clearInput = () => {
        dispatch(GetSearchInputValue(''))
        debouncedSave('')
        searchInput.current.focus()
    }
    
    return (
        <form className="input_form mb-4" onSubmit={e => { e.preventDefault() }}>
            <input
                autoFocus={autoFocus}
                ref={searchInput}
                className="seacrh_input"
                type="text"
                autoComplete="off"
                name="word"
                placeholder="Type a word"
                value={searchInputValue}
                onChange={handleChange}
                onFocus={() => handleOverlay(true)}
                onBlur={() => handleOverlay(false)}
            />
            {searchInputValue && <InputCancelButton clearFunction={clearInput}/>}
            {overlay && <InputRegExOverlay regexInfo={regexInfo}/>}
        </form>
    )
}