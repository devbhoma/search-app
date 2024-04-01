import {combineReducers} from "redux";

import {SEARCH_RESULTS_RECEIVED, TOGGLE_MODEL} from "./const.types";


const search = (state = {
    term: "",
    results: [],
    inflight: false
}, action) => {

    switch (action.type) {

        case SEARCH_RESULTS_RECEIVED:

            if (typeof action.inflight !== "undefined") {
                state.inflight = action.inflight
            }

            if (typeof action.term !== "undefined") {
                state.term = action.term
            }

            if (typeof action.results !== "undefined") {
                state.results = action.results || []
            }

            return {...state}
        default:
            return state
    }
}

const model = (state = {
    isOpen: false,
    details: null
}, action) => {
    switch (action.type) {
        case TOGGLE_MODEL:

            if (typeof action.isOpen !== "undefined") {
                state.isOpen = action.isOpen
            }

            if (typeof action.details !== "undefined") {
                state.details = action.details
            }

            return {...state}
        default:
            return state
    }
}

export default combineReducers({
    search,
    model
})