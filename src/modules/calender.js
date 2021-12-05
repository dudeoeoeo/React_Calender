// Action 정의
const LOAD_DATE = "calendar/LOAD_DATE";
const PREV_MONTH = "calendar/PREV_MONTH";
const NEXT_MONTH = "calendar/NEXT_MONTH";
const ADD_SCHEDULE = "calendar/ADD_SCHEDULE";

const date = new Date();

const initialState = {
    
    thisMonth: date.getMonth(),
    year: date.getFullYear(),
    day: date.getDay(),
    date: date.getDate(),
    schedules: [
        {date: "2021-11-25", desc: "달력 만들기", completed: false},
        {date: "2021-11-28", desc: "놀기", completed: true},
    ],
};

// Action 생성
export const loadDate = (date) => {
    return {type: LOAD_DATE, date};
};
export const prevMonth = (thisMonth) => {
    return {type: PREV_MONTH, thisMonth};
}
export const nextMonth = (thisMonth) => {
    return {type: NEXT_MONTH, thisMonth};
}
export const addSchedule = (date, desc) => {
    return {type: ADD_SCHEDULE, date, desc};
};

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "calendar/LOAD_DATE": {
            return state;
        }
        case "calendar/PREV_MONTH": {
            if(state.thisMonth <= 1) {
                return {...state, thisMonth: state.thisMonth+11, year: state.year - 1};
            } 
            return {...state, thisMonth: state.thisMonth-1};
        }
        case "calendar/NEXT_MONTH": {
            if(state.thisMonth >= 11) {
                return {...state, thisMonth: state.thisMonth - 11, year: state.year + 1};
            }
            return {...state, thisMonth: state.thisMonth + 1};
        }
        case "calendar/ADD_SCHEDULE": {
            return {schedules: [...state.schedules, {date: action.date, desc: action.desc, completed: false}]};
        }
        default:
            return state;
    }
}