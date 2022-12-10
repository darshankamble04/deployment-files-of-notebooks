import React, { useContext, useReducer } from 'react'
import NotebookContext from '../../context/NotebookContext';

const initialState = { show: true };

function reducer(state, action) {
    switch (action.type) {
        case 'setTrue':
            return { show: true };
        case 'setFalse':
            return { show: false };
        default:
            return {show:true};
    }
}

function SearchBar() {
    const Context = useContext(NotebookContext)
    const {SearchKey, setSearchKey} = Context
    const toggleChange = (value)=>{
        setSearchKey(value.toLowerCase())
    }
    const [state, dispatch] = useReducer(reducer, initialState);    
    return (
        <>
            <div class={`d-flex align-items-center searchBar-btn ${state.show ? "d-none" : ""}`} >          
                <input class="searchNotebooks" value={SearchKey} onChange={(e)=>{toggleChange(e.target.value)}} type="search" placeholder="Search" aria-label="Search" />
                <button class="search-btn material-icons" type="submit">search</button>
            </div>
            <button class={`toggleSearch material-icons ${!state.show ? "d-none" : ""}`} onClick={()=>{state.show?dispatch({ type: 'setFalse' }):dispatch({ type: 'setTrue' })}} type="submit">search</button>
            <button class={`toggleSearch material-icons toggleSearch-costom ${state.show ? "d-none" : ""}`} onClick={()=>{state.show?dispatch({ type: 'setFalse' }):dispatch({ type: 'setTrue' })}} type="submit">cancel</button>
        </>
    )
}

export default SearchBar
