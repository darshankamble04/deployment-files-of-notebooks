export const showSearchBar = (visibility)=>{
    return(dispatch)=>{
        dispatch({
            type:'setTrue',
            payload:visibility
        })
    }
}

export const hideSearchBar = (visibility)=>{
    return(dispatch)=>{
        dispatch({
            type:'setFalse',
            payload:visibility
        })
    }
}