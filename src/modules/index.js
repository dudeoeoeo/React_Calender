import { combineReducers } from "redux";
import calendar from './calender';
import schedule from "./schedule";

const rootReducer = combineReducers({
    calendar,
    schedule,
});

export default rootReducer;