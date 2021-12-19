const SCHEDULE_ADD = "schedule/SCHEDULE_ADD";
const SCHEDULE_UPDATE = "schedule/SCHEDULE_UPDATE";
const SCHEDULE_DELETE = "schedule/SCHEDULE_DELETE";

export const schedule_add = (newSchedule) => ({type: SCHEDULE_ADD, newSchedule: newSchedule});
// export const schedule_add = (date, time, desc) => ({type: SCHEDULE_ADD, date: date, time: time, desc: desc});
export const schedule_update = (newSchedule) => ({type: SCHEDULE_UPDATE, newSchedule: newSchedule});
export const schedule_delete = (id) => ({type: SCHEDULE_DELETE, id: id});

const initialState = {
    schedules: [
        {id: 1, date: "2021-12-25", time: "16:40", desc: "맛있는거 먹으러 가기", completed: false},
        {id: 2, date: "2021-12-28", time: "19:40", desc: "놀기", completed: true},
    ],
};

function schedule(state = initialState, action) {
    switch (action.type) {
        case SCHEDULE_ADD:
            // return {...state, date: action.date, time: action.time, desc: action.desc, completed: false};
            // return {...state, schedules: state.schedules.push(state.schedules.length, action.date, action.time, action.desc, false)};
            return {...state, schedules: state.schedules.concat(action.newSchedule)};
        case SCHEDULE_UPDATE:
            return {
                ...state, 
                schedules: state.schedules.map(schedule => 
                    schedule.id === action.newSchedule.id ? 
                    {
                        ...schedule,
                        date: action.newSchedule.date, 
                        time:action.newSchedule.time, 
                        desc: action.newSchedule.desc, 
                        completed: action.newSchedule.completed
                    } : schedule
                )
            };
        case SCHEDULE_DELETE:
            return { ...state, schedules: state.schedules.filter(schedule => schedule.id !== action.id)};
        default:
            return state;
    }
}

export default schedule;