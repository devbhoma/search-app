import React, {memo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSearchInflight, getSearchResults, getSearchTerm} from "../store/selectors";
import {toggleModel} from "../store/actions";


const SearchResult = memo(function (props) {
    const dispatch = useDispatch()
    const inflight = useSelector(getSearchInflight)
    const results = useSelector(getSearchResults)
    const terms = useSelector(getSearchTerm)

    const dialogHandler = (details) => {
        dispatch(toggleModel({
            isOpen: true,
            details
        }))
    }


    return <div className={"search-result-body"}>
        {inflight && <div className={"search-loader"}>
            <p>loading...</p>
        </div>}

        {!inflight && <React.Fragment>
            <ul>
                {terms && results.length === 0 && <li className={"placeholder"}>No search result found</li>}
                {results.map((item) => {
                    return <li key={item.pageid} onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        dialogHandler({
                            title: item.title,
                            snippet: item.snippet,
                        })
                    }}>
                        <h4>{item.title}</h4>
                        {/*<p>{item.snippet}</p>*/}
                        <p dangerouslySetInnerHTML={{__html: item.snippet}}/>
                    </li>
                })}
            </ul>

        </React.Fragment>}
    </div>
})

export default SearchResult