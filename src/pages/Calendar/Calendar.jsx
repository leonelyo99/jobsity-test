import React, { useMemo, useState } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import ArrowLeftIcon from "../../assets/icons/arrow-left-solid.svg";
import ArrowRightIcon from "../../assets/icons/arrow-right-solid.svg";
import NotificationIcon from "../../assets/icons/circle-exclamation-solid.svg";
import { getCalendarMonth, getMonthName } from "../../helpers/month";

const Calendar = ({ events, onOpenEventListModal }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthNumber, setMonthNumber] = useState(new Date().getMonth());

  const monthData = useMemo(
    () => getCalendarMonth(year, monthNumber, events),
    [monthNumber, year, events]
  );

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
            key={`${index}-calendar-day`}
            isWeekend={dayData.isWeekend}
            isCurrentMonth={dayData.isCurrentMonth}
            isToday={dayData.isToday}
          >
            <Time dateTime={dayData.fullDate}>{dayData.dayNumber}</Time>
            {!!dayData.events.length && (
              <NotificationButton
                src={NotificationIcon}
                role="button"
                onClick={() => {
                  onOpenEventListModal(dayData.events);
                }}
              />
            )}
          </Day>
        ))}
      </DateGridContainer>
    </>
  );
};

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      city: PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      description: PropTypes.string.isRequired,
      date: PropTypes.number.isRequired,
    })
  ).isRequired,
  onOpenEventListModal: PropTypes.func.isRequired,
};

export default Calendar;

const MonthIndicator = styled.div`
  color: #334e68;
  text-align: center;
  font-weight: 500;
`;

const ArrowButton = styled.img`
  width: 11px;
  cursor: pointer;
  margin-right: 4px;
  margin-left: 4px;
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
  }
`;

const DateGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-left: 0.5px solid rgb(194, 194, 194);
  border-right: 0.5px solid rgb(194, 194, 194);
  border-bottom: 0.5px solid rgb(194, 194, 194);
`;

const Day = styled.button`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  position: relative;
  margin-left: 0px;
  border: 0.5px solid rgb(194, 194, 194);
  width: 7vw;
  height: 7vw;
  background-color: ${(props) =>
    props.isWeekend && !props.isToday
      ? "rgb(242, 242, 242)"
      : props.isToday
      ? "rgb(213 234 255)"
      : "#FFF"};
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
