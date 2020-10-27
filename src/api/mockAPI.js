import { cards, categories } from './db.json'

const allowedCategories = [
    'food',
    'plants and herbs'
]

export const getCardList = () => new Promise((res, rej) => {
    setTimeout(() => {
        if (!cards) {
            rej("Cards don't exist")
            return
        }
    
        res(cards)
    }, 1000)
})

export const getCategories = () => new Promise((res, rej) => {
    setTimeout(() => {
        if (!categories) {
            rej("Categories don't exist")
            return
        }
    
        res(categories)
    }, 500)
})

export const getCards = (category) => new Promise((res, rej) => {
    setTimeout(() => {
        if (!allowedCategories.includes(category)) {
            rej("Nonexistent category")
            return
        }
    
        res(cards.filter(x => x.type === category))
    }, 1000)
})