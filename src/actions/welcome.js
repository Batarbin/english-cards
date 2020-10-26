// dictionary
export const showInfo = (wordToInfo) => dispatch => {
    if (wordToInfo.length) {
        fetch('https://rapidapi.p.rapidapi.com/words/'+wordToInfo, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": "3755c9b89cmsh3b1ef8c9dc83f60p158504jsnbafd9da0c9be"
            }
        })
        .then(res => res.json()).then(data => {
            dispatch({type: 'SHOW_INFO', payload: data})
        })
        .catch(err => {
            console.error(err);
        });
    } else {
        dispatch({ type: 'SHOW_INFO', payload: null })
    }
}

// welcome
export const onGameStarted = () => ({
    type: 'ON_GAME_STARTED'
})