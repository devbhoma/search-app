
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getModelState} from "../store/selectors";
import {toggleModel} from "../store/actions";


const SearchModel = (props) => {
    const contentRef = useRef(null)
    const dispatch = useDispatch()
    const state = useSelector(getModelState)

    const closeHandler = (e) => {
        if (state.isOpen && contentRef.current && !contentRef.current.contains(e.target)) {
            dispatch(toggleModel({
                isOpen: false,
                details: null
            }))
        }
    }

    const bodyOverflow = () => {
        const body = document.getElementsByTagName("body")
        if (body && body.length > 0) {
            body[0].style.overflow = state.isOpen ? "hidden" : "auto";
        }
    }

    useEffect(() => {
        document.addEventListener("click", closeHandler)
        bodyOverflow()

        return () => {
            bodyOverflow()
            document.removeEventListener("click", closeHandler)
        }
    }, []);

    return <div className={"model-wrapper"}>
        <div className={"model-body-wrapper"}>
            <button className={"model-close-btn"} onClick={closeHandler}>&times;</button>
            <div className={"model-content"} ref={contentRef}>
                {state.details && <div>
                    <h2>{state.details.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: state.details.snippet}}/>
                </div>}
            </div>
        </div>
    </div>
}
export default SearchModel