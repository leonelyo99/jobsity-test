import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { useForm } from "../../hooks/useForm";

const CalendarForm = ({ onSubmit, onSubmitEdit, onClose, eventToEdit }) => {
  const [calendarValue, onChangeCalendarValue] = useState(
    !!eventToEdit ? new Date(eventToEdit.date) : null
  );
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [cityError, setCityError] = useState(false);

  const [formValues, handleInputChange, reset] = useForm(
    !!eventToEdit
      ? {
          title: eventToEdit.title,
          city: eventToEdit.city.name,
          description: eventToEdit.description,
        }
      : {
          title: "",
          city: "",
          description: "",
        }
  );
  const { title, city, description } = formValues;

  useEffect(() => {
    if (!!calendarValue && calendarValue < new Date()) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  }, [calendarValue]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (
      title.length <= 1 ||
      city.length <= 1 ||
      description.length <= 1 ||
      !calendarValue
    )
      return;
    const matchingCities = await fetchCity(city);

    if (matchingCities.length === 0) setCityError(true);

    const event = {
      id: !!eventToEdit ? eventToEdit.id : calendarValue.getTime() + title,
      title,
      city: {
        key: matchingCities[0].Key,
        name: matchingCities[0].EnglishName,
      },
      description,
      date: calendarValue.getTime(),
    };

    if (!!eventToEdit) {
      onSubmitEdit({ id: eventToEdit.id, ...event });
    } else {
      onSubmit(event);
    }
    handleClose();
  };

  const handleClose = () => {
    onChangeCalendarValue(null);
    reset();
    onClose();
  };

  const fetchCity = async (city) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=RWN8JtSdUhBGDeuew6Vyq5AnusYa3CLH&q=${city}`
      );
      if (response.ok) {
        const cityData = await response.json();
        return cityData;
      } else {
      }
    } catch {
      // TODO: add error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Event form</h2>
      <form onSubmit={handleSubmitForm}>
        <Input
          maxLength={30}
          minLength={1}
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={handleInputChange}
          aria-label="Title of the event"
        />
        <br />
        <Input
          maxLength={30}
          minLength={1}
          name="city"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => {
            setCityError(false);
            handleInputChange(e);
          }}
          aria-label="City of the event"
        />
        {cityError && <ErrorMessage>The city was not found</ErrorMessage>}
        <br />
        <Textarea
          maxLength={30}
          minLength={1}
          type="textarea"
          name="description"
          value={description}
          onChange={handleInputChange}
          placeholder="Description"
          aria-label="Description of the event"
        />
        <CalendarContainer>
          <Calendar onChange={onChangeCalendarValue} value={calendarValue} />
        </CalendarContainer>
        {dateError && (
          <ErrorMessage>
            The date cannot be less or equal than the current date
          </ErrorMessage>
        )}
        <ButtonContainer>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <>
              <Button type="submit">Add</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </>
          )}
        </ButtonContainer>
      </form>
    </div>
  );
};

const CalendarContainer = styled.div`
  margin-top: 8px;

  * {
    margin-top: 0px;
  }
`;

const Input = styled.input`
  width: 100%;
  margin-top: 8px;
`;

const Textarea = styled.textarea`
  width: 100%;
  margin-top: 8px;
`;

const ErrorMessage = styled.span`
  color: red;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const Button = styled.button`
  margin-left: 10px;
  margin-top: 10px;
`;

export default CalendarForm;
