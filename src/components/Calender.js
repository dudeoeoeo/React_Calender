import React, { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled, { keyframes, css } from "styled-components";
import { nextMonth, prevMonth } from "../modules/calender";

const date1 = new Date();
const month31 = [4, 6, 9, 11];
const dayToKor = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
const chunsik = "https://post-phinf.pstatic.net/MjAyMTA0MTJfMTAw/MDAxNjE4MjMwMjQ0Mjcy.UcHomwacpcXaJ8_nUksje4UkxE7UOzZ0gcgdZTnl0eEg.hh6qgDmsklQHWhuV2cyTqb6T0CyRF_IxNxy4RseU95Ag.JPEG/IMG_2379.jpg";
const today_chunsik = "https://img4.yna.co.kr/etc/inner/KR/2021/08/20/AKR20210820141400017_01_i_P4.jpg";
// 2 4 6 9 11
// 1 3 5 8 10
const Calender = ({date}) => {
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
    const dispatch = useDispatch();
    // console.log(state);
    console.log(`month: ${state.calendar.thisMonth}, year: ${state.calendar.year}`);
    console.log("day: ", new Date().getDate(), new Date().getDay());
    const prevMonthClick = useCallback((month) => dispatch(prevMonth(month - 1)), [dispatch]);
    const nextMonthClick = useCallback((month) => dispatch(nextMonth(month + 1)), [dispatch]);
    
    const [viewYear, setViewYear] = useState();
    const [viewMonth, setViewMonth] = useState();
    const [viewDay, setViewDay] = useState();
    const [viewDate, setViewDate] = useState();
    const [dayArr, setDayArr] = useState([]);
    const [viewCalendar, setViewCalendar] = useState();
    useEffect(() => {
        setViewYear(calendarDate.year);
        setViewMonth(calendarDate.thisMonth);
        setViewDay(new Date(calendarDate.year, calendarDate.thisMonth, calendarDate.date).getDay());
        setViewDate(calendarDate.date);

        getCalendar(calendarDate.year, calendarDate.thisMonth, calendarDate.day, calendarDate.date);
        // for(let i = 0; i < 13; i++) {
        //     console.log(new Date(2021, i, 0), "index: ", i);
        // }
        // let start = new Date(date1.getFullYear(), date1.getMonth(), 1);
        // getDays(date1.getMonth());
        // console.log("day: ", new Date(state.calendar.year, state.calendar.thisMonth, state.calendar.date).getDay())
        // console.log("prev",getPrevDay(state.calendar.year, state.calendar.thisMonth, state.calendar.day))
        // console.log("next",getNextDay(state.calendar.year, state.calendar.thisMonth, state.calendar.date))
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
            month = 11;
        } 
        let lastDay = new Date(year, month, 0).getDate();
        for(let i = 0; i < firstDay; i++) {
            temp.push(lastDay - firstDay + i + 1);
        }
        setDayArr([...dayArr, temp]);
    }
    const getNowDays = (year, month, temp) => {
        let lastDay = new Date(year, month + 1, 0).getDate() + 1;
        
        for(let i = 1; i < lastDay; i++) {
            temp.push(i);
        }
    }
    const getNextDay = (temp) => {
        for(let i = 1; i < 7; i++) {
            if(temp.length % 7 !== 0) {
                temp.push(i);
                continue;
            }
            break;
        }
    }

    const getCalendar = (year, month, day, date) => {
        let day_arr = [];
        getPrevDay(year, month, day_arr);
        getNowDays(year, month, day_arr);
        getNextDay(day_arr);

        let calendar = day_arr.forEach((day, idx) => {
            console.log(`day: ${day}, idx: ${idx}`);
            <Row key={day * idx}>

            </Row>
        });
    }

    const makeCalender = (year, month, day) => {
        // 현재 월이 전년도나 내년으로 넘어가면 체크해줘야 함
        // {...} 로직 짜기
        
        let now_YMD_Obj = new Date(year, month, 1);
        let leapYear = leapYearBool(year);
        
        let nowMonthDays = [];
        let cnt = 7 - now_YMD_Obj.getDay();
        let weekArr = [cnt];

        let endOfDay = 31;
        if(month31.indexOf(month+1) > -1)
            endOfDay = 30;
        else if(month+1 === 2) {
            if(leapYear)
                endOfDay = 29;
            else
                endOfDay = 28;
        }
        
        let prevEndOfDay = 31;
        if(month31.indexOf(month) > -1) {
            prevEndOfDay = 30;
        } else if(month-1 === 2) {
            prevEndOfDay = leapYear ? 29 : 28;
        }
        // 현재 월에 첫 날짜의 숫자를 가져와 필요한 만큼 전월 일자 채우기
        const nowMonthFirstDay = now_YMD_Obj.getDay();
        for(let i = prevEndOfDay; i > prevEndOfDay - 7; i--) {
            if(nowMonthDays.length >= nowMonthFirstDay)
                break;
            nowMonthDays.push(i);
        }

        let wd_arr = [];
        for(let i = 1; i <= endOfDay; i++) {
            if(i === cnt) {
                cnt += 7;
                if(cnt < 32) {
                    weekArr.push(cnt);
                }
            }
            nowMonthDays.push(i);
            if(nowMonthDays.length === 7) {
                wd_arr.push(nowMonthDays);
                nowMonthDays = [];
            }
        }
        for(let i = 1; nowMonthDays.length < 7; i++)
            nowMonthDays.push(i);
            
        wd_arr.push(nowMonthDays);
        cnt = -now_YMD_Obj.getDay();
        let nowCalender = wd_arr.map((arr, idx) => {
            return (
                <Row key={arr+idx}>
                    {arr.map((day, i) => {
                        cnt += 1;
                        return (
                            <div style={{
                                border: "1px solid black",
                                backgroundImage: cnt === date1.getDate() ? `url(${today_chunsik})` : `url(${chunsik})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                cursor: 'pointer'
                            }} 
                            key={i+cnt}
                            onClick={() => console.log(1)}
                            >
                                {idx === 0 && day > 7 ?
                                    <span style={{
                                        opacity: 0.5,
                                        color: 'black'
                                    }}>
                                         {day}
                                    </span>  : 
                                    idx > 3 && day < 7 ?  
                                    <span style={{ 
                                        opacity: 0.5,
                                        color: 'black'
                                    }}>
                                        {day}
                                    </span>  : 
                                    date1.getDate() === day ? 
                                    <TodayCss style={{fontSize: 20}}>
                                        {day}
                                    </TodayCss> :
                                    <DayCss>
                                        {day}
                                    </DayCss>
                                }
                                
                            </div>
                        );
                    })}
                </Row>
            );
        })
        return nowCalender;
    };

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
                    <div style={{color: 'red'}}>일</div>
                    <div style={{color: 'black'}}>월</div>
                    <div style={{color: 'black'}}>화</div>
                    <div style={{color: 'black'}}>수</div>
                    <div style={{color: 'black'}}>목</div>
                    <div style={{color: 'black'}}>금</div>
                    <div style={{color: 'blue'}}>토</div>
                </Day>
                    <br /><br />
                    {makeCalender(viewYear, viewMonth)}
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

const DayCss = styled.span`
    color: #A33CD6
`;
const TodayCss = styled.span`
    color: #000000;
    font-size: 20px;
`;


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
  /* justify-content:center; */
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

export default Calender;