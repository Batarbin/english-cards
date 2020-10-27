import data from './db.json'

const allowedCategories = [
    'food',
    'plants and herbs'
]

export const getCardList = () => new Promise((res, rej) => {
    setTimeout(() => {
        if (!data.cards) {
            rej("Cards don't exist")
            return
        }
    
        res(data.cards)
    }, 1000)
})

export const getCategories = () => new Promise((res, rej) => {
    setTimeout(() => {
        if (!data.categories) {
            rej("Categories don't exist")
            return
        }
    
        res(data.categories)
    }, 500)
})

export const getCards = (category) => new Promise((res, rej) => {
    setTimeout(() => {
        if (!allowedCategories.includes(category)) {
            rej("Nonexistent category")
            return
        }
    
        res(data.cards.filter(x => x.type === category))
    }, 1000)
})