import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCollectionList, GetCollectionSearchResults, CardCollectionSearchLoading } from '../actions/cardCollectionActions'
import ServerError from '../app/serverError'
import { RootStore } from '../app/store'
import { CardType } from '../types/cardGameTypes'
import { CardCollectionAccordion } from './misc/accordions'
import { SearchInput, SearchInputError } from './misc/searchInput'
import LoadingSpinner from './spinner'

interface SearchResultsI {
    searchResultArr: CardType
}
interface CardItemI {
    title: string
    url: string
    pronunciation: string
    translation: string
}
interface CardCollectionFCI {
    cardCollection: CardType
}

const SearchResults: FC<SearchResultsI> = ({ searchResultArr }) => {
    if (!searchResultArr || !searchResultArr.length) {
        return (
            <div className="card_collection_error">
                <SearchInputError />
            </div>
        )
    }

    return (
        <div className="card_collection_item_content mt-4">
            {searchResultArr.map(x => <CardItem
                key={x.id}
                {...x}
            />)}
        </div>
    )
}
export const CardItem: FC<CardItemI> = ({ title, url, pronunciation, translation }) => {
    return (
        <div className="card">
            <p>{title}</p>
            <img draggable="false" src={url} alt={title} />    
            <p>Pronunciation: '{pronunciation}'</p>
            <p>Translation: {translation}</p>
        </div>
    )
}
const CardCollectionFC: FC<CardCollectionFCI> = ({ cardCollection }) => {
    const typeArr = Array.from(new Set (cardCollection.map(item => item.type))) // get unique types (categories) from cards

    return (<>
        {typeArr.map((item, i) => {
            return (
                  <CardCollectionAccordion title={item} contentArr={cardCollection} key={i} />
              )
        })}
    </>)
}

function CardCollection() {
    const dispatch = useDispatch()
    const cardListState = useSelector((state: RootStore) => state.cardCollectionState)
    const { cardCollection, cardCollectionLoaded, cardCollectionLoading, cardCollectionSearchLoading, searchResultArr, isNull } = cardListState
    const [showScroll, setShowScroll] = useState(false)
    const regexInfo = 'lovercase latin letters'

    useEffect(() => {
        dispatch(GetCollectionList())
    }, [dispatch])
    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)
        function checkScrollTop() {
            if (!showScroll && window.pageYOffset > 400) {
                setShowScroll(true)
            } else if (showScroll && window.pageYOffset <= 400) {
                setShowScroll(false)
            }
        }
        return () => {
            window.removeEventListener('scroll', checkScrollTop)
        }
    })

    function scrollTop() {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    if (!cardCollectionLoaded) {
        return <ServerError />
    }
    if (!cardCollection || !cardCollection.length || cardCollectionLoading) {
        return (
            <LoadingSpinner />
        )
    }
    
    return (
        <div className="card_collection">
            <img draggable="false" src="/images/go-to-top-arrow.png" alt="Scroll to top"
                className="scroll_top_button" 
                onClick={scrollTop} 
                style={{display: showScroll ? 'flex' : 'none'}}
            />
            <h2 className="text-center">Cards collection</h2>
            <SearchInput regex={`[^a-z+$]`} functionToDispatch={GetCollectionSearchResults} loadingFunction={CardCollectionSearchLoading} regexInfo={regexInfo} autoFocus={false}/>
            {cardCollectionSearchLoading ? <div className="mt-4"><LoadingSpinner /></div> :
                !isNull ? <SearchResults searchResultArr={searchResultArr}/> : <CardCollectionFC cardCollection={cardCollection}/>
            }
        </div>
    )
}

export default CardCollection