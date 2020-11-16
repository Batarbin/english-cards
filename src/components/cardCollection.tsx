import debounce from 'lodash.debounce'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Card, CardImg, Collapse, Form, Input } from 'reactstrap'
import { GetCollectionList, GetCollectionSearchResults, CardCollectionSearchLoading } from '../actions/cardCollectionActions'
import ServerError from '../app/serverError'
import { RootStore } from '../app/store'
import { CardTableType } from '../types/cardGameTypes'
import { InputError } from './dictionary'
import LoadingSpinner from './spinner'

interface SearchResultsI {
    searchResultArr: CardTableType
}
interface CardItemI {
    title: string
    url: string
    pronunciation: string
    translation: string
}
interface CardCollectionFCI {
    cardCollection: CardTableType
}

const SearchResults: FC<SearchResultsI> = ({ searchResultArr }) => {
    if (!searchResultArr || !searchResultArr.length) {
        return (
            <div className="card_collection_error">
                <InputError />
            </div>
        )
    }

    return (
        <div className="card_collection_item mt-4">
            <Row className="d-flex align-items-center justify-content-center" >
                {searchResultArr.map(x => <CardItem
                    key={x.id}
                    {...x}
                />)}
            </Row>
        </div>
    )
}
const CardItem: FC<CardItemI> = ({ title, url, pronunciation, translation }) => {
    return (
        <Card body className="text-center justify-content-center mb-4">
            <p>{title}</p>
            <CardImg draggable="false" src={url} alt={title} />    
            <p>Pronunciation: '{pronunciation}'</p>
            <p>Translation: {translation}</p>
        </Card>
    )
}
const CardCollectionFC: FC<CardCollectionFCI> = ({ cardCollection }) => {
    const [togglerId, setTogglerId] = useState('')
    function toggle(i: number) {
        const id = String(i)
        if (!togglerId || id !== togglerId) {
            setTogglerId(id)
            window.scrollTo({top: 0, behavior: 'smooth'})
        } else if (togglerId === id) {
            setTogglerId('')
        }
    }

    const typeArr = Array.from(new Set (cardCollection.map(item => item.type))) // get unique types (categories) from cards

    return (<>
        {typeArr.map((item, i) => {
            return (
                <div className="card_collection_item" key={i}>
                    <div className="category_title"
                        onClick={() => toggle(i)}
                    >
                        <p className="capitalize">{item}</p>
                        <img draggable="false" src="/images/items-down-arrow.png" className={togglerId === String(i) ? 'rotate' : ''} 
                            alt="Cards toggler" />
                    </div>
                    <Collapse isOpen={togglerId === String(i)}>
                        <Row className="d-flex align-items-center justify-content-center" id={`showCardsItem${i}`}>
                            {cardCollection.filter(x => x.type === item)
                                .map(x => <CardItem
                                    key={x.id}
                                    {...x}
                                />)
                            }
                        </Row>
                    </Collapse>
                </div>
            )
        })}
    </>)
}

function CardCollection() {
    const dispatch = useDispatch()
    const cardListState = useSelector((state: RootStore) => state.cardCollectionState)
    const { cardCollection, cardCollectionLoaded, cardCollectionLoading, cardCollectionSearchLoading, searchResultArr, isNull } = cardListState
    const [showScroll, setShowScroll] = useState(false)
    const [value, setValue] = useState("")

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
    const debouncedSave = useRef(debounce(nextValue => dispatch(GetCollectionSearchResults(nextValue)), 600))
            .current
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value: nextValue } = e.target
        nextValue = nextValue.replace(/[^[a-zA-Z0-9\s]+$/g, "")
        setValue(nextValue)
        debouncedSave(nextValue)
        dispatch(CardCollectionSearchLoading())
    }

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
            <Form inline className="mb-4" onSubmit={e => { e.preventDefault(); }}>
                <Input
                    type="text"
                    autoComplete="off"
                    name="word"
                    placeholder="Search in cards"
                    bsSize="lg"
                    value={value}
                    onChange={handleChange}
                />
            </Form>
            {cardCollectionSearchLoading ? <div className="mt-4"><LoadingSpinner /></div> :
                !isNull ? <SearchResults searchResultArr={searchResultArr}/> : <CardCollectionFC cardCollection={cardCollection}/>
            }
        </div>
    )
}

export default CardCollection