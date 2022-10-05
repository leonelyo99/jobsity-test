import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

import PropTypes from "prop-types";
import styled from "styled-components";

import "react-calendar/dist/Calendar.css";

import Button from "../../components/Button";
import { useForm } from "../../hooks/useForm";

const EventForm = ({ onSubmit, onSubmitEdit, onClose, eventToEdit }) => {
  const [calendarValue, onChangeCalendarValue] = useState(
    !!eventToEdit ? new Date(eventToEdit.date) : null
  );
  const [loading, setLoading] = useState(false);

  const initialFormState = !!eventToEdit
    ? {
        title: eventToEdit.title,
        city: eventToEdit.city.name,
        description: eventToEdit.description,
      }
    : {
        title: "",
        city: "",
        description: "",
      };

  const initialFormErrorsState = {
    titleError: null,
    cityError: null,
    descriptionError: null,
    dateError: null,
  };

  const [formValues, formErrors, handleInputChange, handleErrorChange, reset] =
    useForm(initialFormState, initialFormErrorsState);
  const { title, city, description } = formValues;
  const { titleError, cityError, descriptionError, dateError } = formErrors;

  useEffect(() => {
    if (!!calendarValue && calendarValue < new Date().setHours(0, 0, 0, 0)) {
      handleErrorChange({
        dateError: "The date cannot be less than the current date",
      });
    } else {
      handleErrorChange({ dateError: null });
    }
  }, [calendarValue]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const hasAnError = handleErrorForm();
    if (hasAnError) return;

    const matchingCities = await getCity(city);

    if (matchingCities.length === 0) {
      handleErrorChange({ cityError: "The city was not found" });
      return;
    }

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

  const handleErrorForm = () => {
    let hasAnError = false;
    if (!calendarValue) {
      hasAnError = true;
      handleErrorChange({ dateError: "You need to set a date for the event" });
    }
    if (title.length < 1) {
      hasAnError = true;
      handleErrorChange({
        titleError: "You need to set a title for the event",
      });
    }
    if (city.length < 1) {
      hasAnError = true;
      handleErrorChange({
        cityError: "You need to set a city for the event",
      });
    }
    if (description.length < 1) {
      hasAnError = true;
      handleErrorChange({
        descriptionError: "You need to set a description for the event",
      });
    }

    return hasAnError;
  };

  const handleClose = () => {
    onChangeCalendarValue(null);
    reset();
    onClose();
  };

  const getCity = async (city) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.REACT_APP_API_KEY}&q=${city}`
      );
      if (response.ok) {
        const cityData = await response.json();
        return cityData;
      } else {
        handleErrorChange({
          cityError: "Something happened, please try again later",
        });
      }
    } catch {
      handleErrorChange({
        cityError: "Something happened, please try again later",
      });
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
          onChange={(e) => {
            handleErrorChange({
              titleError: null,
            });
            handleInputChange(e);
          }}
          aria-label="Title of the event"
        />
        {!!titleError && <ErrorMessage>{titleError}</ErrorMessage>}
        <br />
        <Input
          maxLength={30}
          minLength={1}
          name="city"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => {
            handleErrorChange({ cityError: null });
            handleInputChange(e);
          }}
          aria-label="City of the event"
        />
        {!!cityError && <ErrorMessage>{cityError}</ErrorMessage>}
        <br />
        <Textarea
          maxLength={30}
          minLength={1}
          type="textarea"
          name="description"
          value={description}
          onChange={(e) => {
            handleErrorChange({ descriptionError: null });
            handleInputChange(e);
          }}
          placeholder="Description"
          aria-label="Description of the event"
        />
        {!!descriptionError && <ErrorMessage>{descriptionError}</ErrorMessage>}
        <CalendarContainer>
          <Calendar
            onChange={(e) => {
              handleErrorChange({
                dateError: null,
              });
              onChangeCalendarValue(e);
            }}
            value={calendarValue}
          />
        </CalendarContainer>
        {!!dateError && <ErrorMessage>{dateError}</ErrorMessage>}
        <ButtonContainer>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <>
              <Button type="submit" marginRight={10}>
                Add
              </Button>
              <Button onClick={handleClose} secondary>
                Cancel
              </Button>
            </>
          )}
        </ButtonContainer>
      </form>
    </div>
  );
};

EventForm.propTypes = {
  eventToEdit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    city: PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    description: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSubmitEdit: PropTypes.func.isRequired,
};

export default EventForm;

const CalendarContainer = styled.div`
  margin-top: 8px;
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
  margin-top: 10px;
`;
