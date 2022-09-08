import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowLeftIcon from "../../assets/icons/arrow-left-solid.svg";
import ArrowRightIcon from "../../assets/icons/arrow-right-solid.svg";
import NotificationIcon from "../../assets/icons/circle-exclamation-solid.svg";
import { getCalendarMonth, getMonthName } from "../../helpers/month";

const CalendarComponent = ({ events }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthNumber, setMonthNumber] = useState(new Date().getMonth());
  const [monthData, setDaysOfTheMonthData] = useState([]);

  useEffect(() => {
    setDaysOfTheMonthData(getCalendarMonth(year, monthNumber, events));
    console.log(monthData);
  }, [monthNumber, year, events]);

  const handleChangeYear = (number) => {
    setYear((prevYear) => prevYear + number);
  };

  const handleChangeMonth = (number) => {
    if (monthNumber === 11 && number === +1) return;
    if (monthNumber === 0 && number === -1) return;
    setMonthNumber((prevMonth) => prevMonth + number);
  };

  return (
    <>
      <MonthIndicator>
        <p>
          <ArrowButton
            src={ArrowLeftIcon}
            role="button"
            onClick={() => handleChangeYear(-1)}
          />
          {year}
          <ArrowButton
            src={ArrowRightIcon}
            role="button"
            onClick={() => handleChangeYear(+1)}
          />
        </p>
        <p>
          <ArrowButton
            src={ArrowLeftIcon}
            role="button"
            onClick={() => handleChangeMonth(-1)}
          />
          {getMonthName(monthNumber)}
          <ArrowButton
            src={ArrowRightIcon}
            role="button"
            onClick={() => handleChangeMonth(+1)}
          />
        </p>
      </MonthIndicator>
      <DayOfTheWeekContainer>
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </DayOfTheWeekContainer>
      <DateGridContainer>
        {monthData.map((dayData, index) => (
          <Day
            key={index}
            isWeekend={dayData.isWeekend}
            isCurrentMonth={dayData.isCurrentMonth}
          >
            <Time dateTime={dayData.fullDate}>{dayData.dayNumber}</Time>
            {!!dayData.events.length && (
              <NotificationButton
                src={NotificationIcon}
                role="button"
                onClick={() => {}}
              />
            )}
          </Day>
        ))}
      </DateGridContainer>
    </>
  );
};

export default CalendarComponent;

const MonthIndicator = styled.div`
  color: #334e68;
  text-align: center;
  font-weight: 500;
`;

const ArrowButton = styled.img`
  width: 11px;
  cursor: pointer;
  margin-right: 4px;
`;

const NotificationButton = styled.img`
  width: 11px;
  cursor: pointer;
  margin-top: 8px;
  margin-right: 4px;
`;

const DayOfTheWeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 2rem;

  & > * {
    background-color: rgb(47, 116, 181);
    font-size: 0.8rem;
    color: white;
    font-weight: 500;
    text-align: center;
    margin-top: 0px;
  }
`;

const DateGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 0px;
  border-left: 0.5px solid rgb(194, 194, 194);
  border-right: 0.5px solid rgb(194, 194, 194);
  border-bottom: 0.5px solid rgb(194, 194, 194);
`;

const Day = styled.button`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  position: relative;
  margin-top: 0px;
  margin-left: 0px;
  border: 0.5px solid rgb(194, 194, 194);
  width: 7vw;
  height: 7vw;
  background-color: ${(props) =>
    props.isWeekend ? "rgb(242, 242, 242)" : "#FFF"};
  color: ${(props) =>
    props.isWeekend && props.isCurrentMonth
      ? "rgb(47, 116, 181)"
      : props.isCurrentMonth
      ? "black"
      : "rgb(187, 187, 187)"};
`;

const Time = styled.time`
  height: fit-content;
  width: fit-content;
  margin: 5px;
`;
