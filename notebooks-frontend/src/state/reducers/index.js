import { combineReducers } from "redux";
import setState from "./setState";

 const reducers = combineReducers({
    visibility:setState
})

export default reducers;