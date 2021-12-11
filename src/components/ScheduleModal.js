import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

const ScheduleModal = ({ reservationDate, setIsVisible }) => {
    const textAreaRef = useRef(null);

    const [timeValue, setTimeValue] = useState('');
    const [todo, setTodo] = useState('');
    
    const timeChange = useCallback((e) => {
        setTimeValue(e.target.value);
    }, []);
    const textChange = useCallback((e) => {
        setTodo(e.target.value);
    })

    const [scheduleObj, setScheduleObj] = useState({
        year: '',
        time: '',
        desc: '',
        completed: false,
    })

    const onSubmitBtn = () => {
        console.log("submit", reservationDate, timeValue, todo);
        setScheduleObj({
            year: reservationDate,
            time: timeValue,
            desc: todo,
            completed: false,
        });
        setIsVisible(false);
    };
    return (
        <ScheduleModalContainer>
            예약 날짜
            <br />
          <div>
              예약일: <input type="text" value={reservationDate} />
              <br /><br />
              예약시간: <input type="time" value={timeValue} onChange={timeChange} />
              <br /><br />
              계획을 적어주세요. <hr /> <textarea maxLength={200} rows={5} onChange={textChange}/>
          </div>
          <br /><br />
          <div>
            <button onClick={() => onSubmitBtn()}>예약 신청</button>
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