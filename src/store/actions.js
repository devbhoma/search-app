import {TOGGLE_MODEL, SEARCH_RESULTS_RECEIVED} from "./const.types";


export const requestSearch = (term) => {

    return (dispatch) => {
        dispatch(updateSearchState({term, inflight: true}))
        fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${term}`)
            .then(async (response) => {
                const resp = await response.json()
                const state = {
                    term,
                    inflight: false,
                    results: []
                }

                if (resp && resp.query && typeof resp.query !== "undefined" && typeof resp.query.search !== "undefined" && Array.isArray(resp.query.search)) {
                    state.results = resp.query.search
                }

                dispatch(updateSearchState(state))
            }).catch(err => {
            console.log("Error:-->", err)

            dispatch(updateSearchState({term, inflight: false, results: []}))
        })
    }
}

export const updateSearchState = (options = {}) => {
    return {type: SEARCH_RESULTS_RECEIVED, ...options}
}

export const toggleModel = (options = {}) => {
    return {type: TOGGLE_MODEL, ...options}
}