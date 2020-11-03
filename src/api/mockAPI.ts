import { cards, categories } from './db.json'

const allowedCategories: string[] = [
    'food',
    'plants and herbs'
]

type getCollectionListI = {
    title: string
    url: string
    pronunciation: string
    translation: string
    id: number
    type: string
}[]
type getCategoriesListI = {
    title: string
    url: string
    id: number
}[]
type getCategoryCardsI = {
    title: string
    url: string
    pronunciation: string
    translation: string
    id: number
    type: string
}[]

export function getCollectionList(): Promise<getCollectionListI> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (!cards) {
                rej("Cards don't exist")
                return
            }
        
            return res(cards)
        }, 1000)
    })
}
export function getCategoriesList(): Promise<getCategoriesListI> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (!categories) {
                rej("Categories don't exist")
                return
            }
        
            return res(categories)
        }, 500)
    })
}
export function getCategoryCards(category: string): Promise<getCategoryCardsI> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (!allowedCategories.includes(category)) {
                rej("Categories don't exist")
                return
            }
        
            return res(cards.filter(x => x.type === category))
        }, 500)
    })
}