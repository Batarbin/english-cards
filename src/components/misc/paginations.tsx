import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DictionaryPaginationGetCurrentPage } from '../../actions/dictionaryActions'
import { RootStore } from '../../app/store'

export const DictionaryPagination: FC = () => {
    const dictionaryState = useSelector((state: RootStore) => state.dictionaryState)
    const { wordInfo, currentPage, pageNumbers, dictionaryLoaded } = dictionaryState
    const dispatch = useDispatch()

    if (!dictionaryLoaded) {
        return null
    }

    function handleClick(number: number) {
        if (number !== currentPage && number > 0 && number < (pageNumbers.length + 1) && wordInfo?.results) {
            const indexOfLastResult = number * 3
            const indexOfFirstResult = indexOfLastResult - 3
            const currentResultsArr = wordInfo?.results.slice(indexOfFirstResult, indexOfLastResult)
            dispatch(DictionaryPaginationGetCurrentPage(currentResultsArr, number))
        }
    }
    function pageClassName(number: number) {
        if (currentPage === number) {
            return 'current'
        } else {
            return ''
        }
    }

    return (
        <div className="dictionary_pages">
            <span onClick={() => handleClick(currentPage - 1)}>&lt;</span>
            {pageNumbers.map(number => {
                return (
                    <span className={pageClassName(number)} key={number} onClick={() => handleClick(number)} >
                        {number}
                    </span>
                )
            })}
            <span onClick={() => handleClick(currentPage + 1)}>&gt;</span>
        </div>
    )
}