import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { DictionaryPaginationGetCurrentPage } from '../../actions/dictionaryActions'
import { ResultsType } from '../../types/dictionaryTypes'

interface DictionaryPaginationI {
    results: ResultsType[]
    currentPage: number
    pageNumbers: number[]
}

export const DictionaryPagination: FC<DictionaryPaginationI> = ({ results, currentPage, pageNumbers }) => {
    const dispatch = useDispatch()
    function handleClick(number: number) {
        if (number !== currentPage && number > 0 && number < (pageNumbers.length + 1) && results) {
            const indexOfLastResult = number * 3
            const indexOfFirstResult = indexOfLastResult - 3
            const currentResultsArr = results.slice(indexOfFirstResult, indexOfLastResult)
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