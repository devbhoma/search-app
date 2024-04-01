import SearchInput from "./components/search.input";
import SearchResult from "./components/search.result";
import SearchModel from "./components/search.model";
import {useSelector} from "react-redux";
import {getModelState} from "./store/selectors";

function App() {
    const modelState = useSelector(getModelState)
    return (
        <div className="search-container">
            <h1>Search App</h1>
            <SearchInput/>
            <SearchResult/>
            {modelState.isOpen && <SearchModel/>}
        </div>
    );
}

export default App;
