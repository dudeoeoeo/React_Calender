import React, { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled, { keyframes, css } from "styled-components";
import { nextMonth, prevMonth } from "../modules/calender";
import { schedule_add, schedule_update, schedule_delete } from '../modules/schedule';
import Modal from './Modal';
import BlackoutBody from './BlackoutBody';
import ScheduleModal from './ScheduleModal';

const date1 = new Date();
const month31 = [4, 6, 9, 11];
const dayToKor = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
const chunsik = "https://post-phinf.pstatic.net/MjAyMTA0MTJfMTAw/MDAxNjE4MjMwMjQ0Mjcy.UcHomwacpcXaJ8_nUksje4UkxE7UOzZ0gcgdZTnl0eEg.hh6qgDmsklQHWhuV2cyTqb6T0CyRF_IxNxy4RseU95Ag.JPEG/IMG_2379.jpg";
const today_chunsik = "https://img4.yna.co.kr/etc/inner/KR/2021/08/20/AKR20210820141400017_01_i_P4.jpg";

const Calender = () => {
    const scheduleStyle = {
        height: "20%",
        width: "100%",
        minHeight: "11px",
        backgroundColor: "#112667",
        overFlow: "hidden",
        textOverFlow: "ellipsis",
        whiteSpace: "nowrap",
        color: "#fff",
        padding: "1px",
        margin: "0",
        fontSize: "0.5em",
        cursor:"pointer",
    };
    
    const state = useSelector(state => state);
    const calendarDate = useSelector(state => state.calendar);
    const schedules = useSelector(state => state.schedule.schedules);
    const dispatch = useDispatch();
    console.log("calender schedule: ",schedules);
    console.log(calendarDate);
    console.log(`month: ${state.calendar.thisMonth}, year: ${state.calendar.year}`);
    console.log("day: ", new Date().getDate(), new Date().getDay());
    const prevMonthClick = useCallback((month) => dispatch(prevMonth(month - 1)), [dispatch]);
    const nextMonthClick = useCallback((month) => dispatch(nextMonth(month + 1)), [dispatch]);

    const addScheduleClick = useCallback((schedule) => dispatch(schedule_add(schedule.date, schedule.desc)));
    const updateScheduleClick = useCallback((schedule) => dispatch(schedule_update(schedule.id, schedule.date, schedule.desc)));
    const deleteScheduleClick = useCallback((schedule) => dispatch(schedule_delete(schedule.id)));
    
    const [viewYear, setViewYear] = useState();
    const [viewMonth, setViewMonth] = useState();
    const [viewDay, setViewDay] = useState();
    const [viewDate, setViewDate] = useState();
    const [viewCalendar, setViewCalendar] = useState();

    
    const [reservationDate, setReservationDate] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const onSetIsVisible = (active) => {
        console.log("onSetIsVisible", active);
        setIsVisible(active);
    };

    const [settingModal, setSettingModal] = useState(false);

    useEffect(() => {
        setViewYear(calendarDate.year);
        setViewMonth(calendarDate.thisMonth);
        setViewDay(new Date(calendarDate.year, calendarDate.thisMonth, calendarDate.date).getDay());
        setViewDate(calendarDate.date);

        getCalendar(calendarDate.year, calendarDate.thisMonth, calendarDate.day, calendarDate.date);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, state, calendarDate]);

    const getDays = (month) => {
        const temp = [];
        if(month + 1 !== 2) {
            const endDate = month31.indexOf(month+1) > -1 ? 31 : 30;
            for(let i = 1; i < endDate + 1; i++) {
                temp.push(i);
            }
        }
        // setDays(temp);
    }

    const leapYearBool = (year) => {
        if (year % 4 === 0) {
            if (year % 100 === 0 && year % 400 === 0) {
                return true;
            }
        }
        return false;
    }
    const getPrevDay = (year, month, temp) => {
        let firstDay = new Date(year, month, 1).getDay();
        if(month <= 0) {
            year -= 1;
            month = 12;
        }
        let lastDay = new Date(year, month, 0).getDate();
        for(let i = 0; i < firstDay; i++) {
            temp.push(year + '-' + month + '-' + (lastDay - firstDay + i + 1));
        }
    }
    const getNowDays = (year, month, temp) => {
        let lastDay = new Date(year, month + 1, 0).getDate() + 1;
        month += 1;
        for(let i = 1; i < lastDay; i++) {
            temp.push(year + '-' + month + '-' + i);
        }
    }
    const getNextDay = (year, month, temp) => {
        month += 2;
        if(month >= 13) {
            year += 1;
            month = 1;
        } 
        for(let i = 1; i < 7; i++) {
            if(temp.length % 7 !== 0) {
                temp.push(year + '-' + month + '-' + i);
                continue;
            }
            break;
        }
    }
    const divideArr = (day_arr) => {
        let temp = day_arr.slice();
        let cnt = 0;
        day_arr = [];
        for(let i = 1; i < temp.length; i++) {
            day_arr.push(temp.slice(cnt * 7, i * 7));
            cnt++;
            if(i * 7 >= temp.length)
                break;
        }
        return day_arr;
    }

    const getCalendar = (year, month, day, date) => {
        let day_arr = [];
        getPrevDay(year, month, day_arr);
        getNowDays(year, month, day_arr);
        getNextDay(year, month, day_arr);
        day_arr = divideArr(day_arr);
        let fontColorArr = ['red', 'black', 'black', 'black', 'black', 'black', 'blue'];
        let today_cnt = -new Date(calendarDate.year, calendarDate.thisMonth, 1).getDay();
        schedules.map(s => console.log("s.date",s.date));
        let calendar = day_arr.map((week, index) => {
            return (
                <Row key={(week * week + index) / week}>
                    {week.map((day, idx) => {
                        today_cnt += 1;
                        return (
                            <div 
                                style={{
                                    border: "1px solid black",
                                    backgroundImage: today_cnt === calendarDate.date ? `url(${today_chunsik})` : `url(${chunsik})`,
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    cursor: 'pointer',
                                    opacity: `${(index === 0 && day.split('-')[2] > 7) || (index > 3 && day.split('-')[2] < 7) ? 0.5 : 1}`,
                                }}
                                key={`${day}-${idx}`}
                                onClick={() => {
                                    setReservationDate(day);
                                    setIsVisible(true);
                                }}
                            >
                                {(index === 0 && day > 7) || (index > 3 && day < 7) ? (
                                    <span style={{
                                        color: `${fontColorArr[idx]}`,
                                        opacity: 0.5
                                    }}
                                    key={day}
                                    >{day.split('-')[2]}</span>
                                ) : (
                                    <span style={{
                                        color: `${fontColorArr[idx]}`,
                                    }}
                                    key={day}
                                    >{day.split('-')[2]}</span>
                                )}
                                {schedules
                                    .filter(schedule => schedule.date === day)
                                    .map((schedule) => {
                                        return (
                                            <div
                                                style={scheduleStyle}
                                                className={schedule.completed}
                                                key={schedule.desc}
                                                onClick={() => setIsVisible(true)}
                                            >
                                                <span>{`${schedule.desc.length > 7 ? schedule.desc.substr(0, 7)+'...' : schedule.desc}`}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })}
                </Row>
            )
        });
        setViewCalendar(calendar);
        // return calendar;
    }

    return (
        <Container>
            <Header>
                <button onClick={prevMonthClick}>◀</button>
                <span>
                    {`${viewYear}년 ${viewMonth + 1}월 ${viewDate}일 ${dayToKor[viewDay]}`}
                </span>
                <button onClick={nextMonthClick}>▶</button>
            </Header>
            <Days>
                <Day>
                    <div key={'sun'} style={{color: 'red'}}>일</div>
                    <div key={'mon'} style={{color: 'black'}}>월</div>
                    <div key={'tues'} style={{color: 'black'}}>화</div>
                    <div key={'wen'} style={{color: 'black'}}>수</div>
                    <div key={'thur'} style={{color: 'black'}}>목</div>
                    <div key={'fri'} style={{color: 'black'}}>금</div>
                    <div key={'sat'} style={{color: 'blue'}}>토</div>
                </Day>
                    <br /><br />
                    {/* {makeCalender(viewYear, viewMonth)} */}
                    {/* {getCalendar(viewYear, viewMonth, viewDay, viewDate)} */}
                    {viewCalendar}
                    {isVisible && <BlackoutBody onSetIsVisible={onSetIsVisible} />}
                    {isVisible && (
                        <ScheduleModal 
                            reservationDate={reservationDate} 
                            setIsVisible={setIsVisible}
                            schedule_add={schedule_add}  
                            dispatch={dispatch}
                        />
                    )}

                    {/* {settingModal && 
                    <SettingWrapper>
                        <Modal />asda
                    </SettingWrapper>} */}
            </Days>

            <FloatBtn1 onClick={() => console.log("1번째 버튼 클릭")}>
                Finished
            </FloatBtn1>
            <FloatBtn2 onClick={() => console.log("2번째 버튼 클릭")}>
                Add
            </FloatBtn2>
        </Container>
    );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
//   justify-content:center;
  flex-direction: column;
  display: flex;
  font-size: 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 5px 20px;
  box-sizing: border-box;
  font-weight: 600;
  width: 100%;
  height: 14%;
  font-size: 1em;
  & button {
    margin: 0 25px;
    cursor: pointer;
    outline: none;
    display: inline-flex;
    background: transparent;
    border: none;
    color: #444078;
    font-size: 1.2em;
    padding: 4px;
    &:hover {
      color: #fff;
    }
    &:active {
    }
  }
`;
const Days = styled.div`
  background-color: #fff;
  width: 93%;
  height: 81%;
  padding: 8px 10px;
  box-sizing: border-box;
  color: #787c9c;
  margin: 0;
  border-radius: 5px;
  font-size: 0.8em;
`;
const Day = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  & div {
    min-width: 13%;
    max-height: 5%;
    text-align: center;
    font-weight: 600;
    box-sizing: border-box;
  }
`;

const Row = styled.div`
  width: 100%;
  height: 16%;
  display: flex;
  justify-content: center;
  & div {
    width: 13%;
    height: 100%;
    font-weight: 600;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  & span {
    margin: 3px 0 0 3px;
    font-size: 0.8em;
    justify-content: flex-start;
    margin-right: 80%;
  }
`;

const FloatBtn1 = styled.button`
  box-shadow: 0 1px 2px 0 #777;
  position: fixed;
  z-index: 999;
  right: 30%;
  bottom: 8%;
  width: 18%;
  min-width: 80px;
  max-width: 130px;
  height: 30px;
  margin: auto 0px;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.7em;
  color: #4d4887;
  cursor: pointer;
  outline: none;
`;
const FloatBtn2 = styled.button`
  box-shadow: 0 1px 2px 0 #777;
  position: fixed;
  z-index: 999;
  right: 20%;
  bottom: 8%;
  width: 18%;
  min-width: 80px;
  max-width: 130px;
  height: 30px;
  margin: auto 0px;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  color: #4d4887;
  font-size: 0.7em;
  cursor: pointer;
  outline: none;
  & img {
    margin-top: 2px;
    max-height: 70%;
    width: auto;
    color: #bebddb;
  }
`;

const SettingWrapper = styled.div`
    position: absolute; // fixed도 가능하다.
    left: 40.0%;
    z-index: 999;
    top: 20%;
`;

export default Calender;