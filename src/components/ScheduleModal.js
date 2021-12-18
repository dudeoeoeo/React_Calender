import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const ScheduleModal = ({ 
        reservationDate, 
        setIsVisible, 
        schedule_add, 
        schedule_update,
        schedule_delete,
        dispatch, 
        scheduleObj, 
        len 
    }) => {

    const schedule_add_click = useCallback((s_obj) => dispatch(schedule_add(s_obj)), [schedule_add, dispatch]);
    const schedule_update_click = useCallback((s_obj) => dispatch(schedule_update(s_obj)), [schedule_update, dispatch]);
    const schedule_delete_click = useCallback((s_obj) => dispatch(schedule_delete(s_obj.id)), [schedule_delete, dispatch]);

    const [timeValue, setTimeValue] = useState(scheduleObj ? scheduleObj.time : '' );
    const [todo, setTodo] = useState(scheduleObj ? scheduleObj.desc : '');
    
    const timeChange = useCallback((e) => {
        setTimeValue(e.target.value);
    }, []);
    const textChange = useCallback((e) => {
        setTodo(e.target.value);
    }, []);

    const onSubmitBtn = (active) => {
        const newSchedule = ({
            id: active === 'add' ? len + 1 : scheduleObj.id,
            date: reservationDate,
            time: timeValue,
            desc: todo,
            completed: false
        })
        if(active === 'add')
            schedule_add_click(newSchedule);
        else if(active === 'update')
            schedule_update_click(newSchedule);
        else {
            schedule_delete_click(newSchedule);
        }
        setIsVisible(false);
    };
    return (
        <ScheduleModalContainer>
            예약 티켓
            <br />
            {scheduleObj !== null ? 
                <div>
                    예약일: <input type="text" value={scheduleObj.date} />
                    <br /><br />
                    예약시간: <input type="time" onChange={timeChange} value={timeValue}/>
                    <br /><br />
                    계획을 적어주세요. <hr /> <textarea maxLength={200} rows={5} onChange={textChange} value={todo}/>
                </div>
                : 
                <div>
                    예약일: <input type="text" value={reservationDate} />
                    <br /><br />
                    예약시간: <input type="time" onChange={timeChange} value={timeValue} />
                    <br /><br />
                    계획을 적어주세요. <hr /> <textarea maxLength={200} rows={5} value={todo} onChange={textChange}/>
                </div>
          }
          <br /><br />
          <div>
            {scheduleObj !== null ? (
                <>
                    <button onClick={() => onSubmitBtn("update")}>예약 변경</button>
                    <button onClick={() => onSubmitBtn("delete")}>예약 취소</button>
                </>
            ):
                    <button onClick={() => onSubmitBtn("add")}>예약 신청</button>
            }
            
          </div>
        </ScheduleModalContainer>
      );
};

export default ScheduleModal;

const ScheduleModalContainer = styled.div`
    background-color: #F4FFFF;
    width: 40%;
    min-width: 300px;
    max-width: 600px;
    height: 50%;
    overflow-y: auto;
    position: fixed;
    left: 50%;
    top: 50%;
    // padding: 5px;
    transform: translate(-50%, -50%);
    z-index: 1011;
`