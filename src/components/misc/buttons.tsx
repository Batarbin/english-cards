import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ContinueWithThisCategory, GetCategoriesList, OnBackToCategories } from '../../actions/cardGameActions'

interface InputCancelButtonI {
    clearFunction: () => void
}
interface RouteButtonI {
    className: string
    path: string
    text: string
}
interface DispatchButtonI {
    className: string
    firstFunction: () => void
    secondFunction?: () => void
    text: string
}

export const BackToCategoriesButton = () => {
    return (
        <DispatchButton className={'back_button'} firstFunction={OnBackToCategories} secondFunction={GetCategoriesList} text={'Change category'}/>
    )
}
export const BackToGameModesButton = () => {
    return (
        <DispatchButton className={'continue_button'} firstFunction={ContinueWithThisCategory} text={'Change game mode'}/>
    )
}

export const InputCancelButton: FC<InputCancelButtonI> = ({ clearFunction }) => {
    return (
        <span className="input_clear_button" onClick={clearFunction}>&times;</span>
    )
}
export const RouteButton: FC<RouteButtonI> = ({ className, path, text }) => {
    const history = useHistory()
    return (
        <button className={className}
            onClick = {() => { history.push(path) } }
        >
            {text}
        </button>
    )
}
export const DispatchButton: FC<DispatchButtonI> = ({ className, firstFunction, secondFunction, text }) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        if (secondFunction) {
            dispatch(firstFunction())
            dispatch(secondFunction())
        } 
        dispatch(firstFunction())
    }
    return (
        <button className={className} 
            onClick = {() =>  { handleClick() } }
        >
            {text}
        </button>
    )
}