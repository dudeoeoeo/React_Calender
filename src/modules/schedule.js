const SCHEDULE_ADD = "schedule/SCHEDULE_ADD";
const SCHEDULE_UPDATE = "schedule/SCHEDULE_UPDATE";
const SCHEDULE_DELETE = "schedule/SCHEDULE_DELETE";

export const schedule_add = (date, desc) => ({type: SCHEDULE_ADD, date: date, desc: desc});
export const schedule_update = (id, date, desc) => ({type: SCHEDULE_UPDATE, date: date, desc: desc});
export const schedule_delete = (id) => ({type: SCHEDULE_DELETE});

const initialState = {
    schedules: [
        {id: 1, date: "2021-12-25", desc: "달력 만들기", completed: false},
        {id: 2, date: "2021-12-28", desc: "놀기", completed: true},
    ],
};

function schedule(state = initialState, action) {
    switch (action.type) {
        case SCHEDULE_ADD:
            return {...state, date: state.date, desc: state.desc, completed: false};
        case SCHEDULE_UPDATE:
            return {
                ...state, 
                schedules: state.schedules.map(schedule => 
                    schedule.id === action.id ? {...schedule, date: action.date, desc: state.desc, completed: state.completed} : schedule
                )
            };
        case SCHEDULE_DELETE:
            return {
                ...state,
                schedules: state.schedules.filter(schedule => schedule.id !== action.id)
            }
        default:
            return state;
    }
}

export default schedule;