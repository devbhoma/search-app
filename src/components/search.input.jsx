import {useDispatch, useSelector} from "react-redux";
import {getSearchTerm} from "../store/selectors";
import {requestSearch, updateSearchState} from "../store/actions";


var searchDebounce = null
const SearchInput = function (props) {
    const dispatch = useDispatch()
    const term = useSelector(getSearchTerm)


    const onSearch = (value) => {
        dispatch(updateSearchState({term: value}))
        clearTimeout(searchDebounce)

        searchDebounce = setTimeout(() => {
            if (value !== "") {
                dispatch(requestSearch(value))
            } else {
                dispatch(updateSearchState({results: []}))
            }
        }, 500)
    }


    return <div className={"search-input"}>
        <input
            type={"search"}
            placeholder={"Search here.."}
            value={term}
            onChange={(e) => onSearch(e.target.value)}
        />
    </div>
}
export default SearchInput