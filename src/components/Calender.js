import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from "styled-components";

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

    const [viewYear, setViewYear] = useState();
    const [viewMonth, setViewMonth] = useState();
    const [viewDay, setViewDay] = useState();
    const [days, setDays] = useState([]);

    const makeCalender = (year, month) => {
        // 현재 월이 전년도나 내년으로 넘어가면 체크해줘야 함
        // {...} 로직 짜기
        
        let now_YMD_Obj = new Date(year, month, 1);
        let leapYear = false;
        // 4로 나눠도 0이고
        // 100으로 나눌 때 0이 아님
        // 400으로 나누면 0이어야 함
        if(year % 4 === 0) {
            if(year % 100 === 0 && year % 400 === 0) {
                leapYear = true;
            }
        }
        
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

    useEffect(() => {
        setViewYear(date1.getFullYear());
        setViewMonth(date1.getMonth());
        setViewDay(date1.getDay());
        let start = new Date(date1.getFullYear(), date1.getMonth(), 1);
        console.log("date1:",date1);
        console.log("date1 month:",date1.getMonth());
        console.log("start: ",start.getDay());
        console.log("day:", date1.getDate());
        getDays(date1.getMonth());
    }, []);

    const getDays = (month) => {
        const temp = [];
        if(month + 1 !== 2) {
            const endDate = month31.indexOf(month+1) > -1 ? 31 : 30;
            for(let i = 1; i < endDate + 1; i++) {
                temp.push(i);
            }
        }
        setDays(temp);
    }

    return (
        <Container>
            <Header>
                <button onClick={() => console.log("prev")}>◀</button>
                <span>
                    {`${dayToKor[viewDay]} ${viewMonth+1}월 ${viewYear}년`}
                </span>
                <button onClick={() => console.log("next")}>▶</button>
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


{/* <div>
    <div className="calendar">
        <div className="header">
            <div className="year-month">
                {viewYear}년 {viewMonth}월
                <div className="nav">
                    <button className="nav-btn go-prev">&lt;</button>
                    <button className="nav-btn go-today">Today</button>
                    <button className="nav-btn go-next">&gt;</button>
                </div>
            </div>
            <div className="main">
                <div className="days">
                    <div className="day">일</div>
                    <div className="day">월</div>
                    <div className="day">화</div>
                    <div className="day">수</div>
                    <div className="day">목</div>
                    <div className="day">금</div>
                    <div className="day">토</div>
                    {days}
                </div>
                <div className="dates"></div>
            </div>
        </div>
    </div>
    
</div> */}