const reducers = (state=true,action)=>{
    if(action.type == setTrue){
        return state=true;
    }
    else if(action.type == setFalse){
        return state=false;
    }
    else{
        return state;
    }

}

export default reducers;