import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import { useDispatch, useSelector } from "react-redux";
import { editEvent, setEvents } from "../../actions/events";
import CalendarForm from "./CalendarForm";
import CalendarComponent from "./Calendar";
import Event from "./Event";
import EventList from "./EventList";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function CalendarScreen(props) {
  const dispatch = useDispatch();
  const [calendarModalIsOpen, setCalendarModalIsOpen] = useState(false);
  const [eventListModalIsOpen, setEventListModalIsOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [eventListToModal, setEventListToModal] = useState();
  const events = useSelector((state) => state.events);

  const handleOpenCalendarModal = () => {
    setCalendarModalIsOpen(true);
  };

  const handleCloseCalendarModal = () => {
    !!eventToEdit && setEventToEdit(null);
    setCalendarModalIsOpen(false);
  };

  const handleOpenEventListModal = (events) => {
    setEventListToModal(events);
    setEventListModalIsOpen(true);
  };

  const handleCloseEventListModal = () => {
    setEventListModalIsOpen(false);
  };

  const handleSubmitForm = (formValues) => {
    dispatch(setEvents(formValues));
  };

  const handleSubmitEditForm = (formValues) => {
    dispatch(editEvent(formValues));
    setEventToEdit(null);
  };

  const handleEditEvent = (event) => {
    console.log(event);
    setEventToEdit(event);
    handleOpenCalendarModal();
  };

  return (
    <Container>
      <HeaderContainer>
        <Button onClick={handleOpenCalendarModal}>Add event</Button>
        <Event events={events} />
      </HeaderContainer>
      <CalendarComponent
        events={events}
        onEditEvent={handleEditEvent}
        onOpenEventListModal={handleOpenEventListModal}
      />
      <Modal
        ariaHideApp={false}
        isOpen={calendarModalIsOpen}
        onRequestClose={handleCloseCalendarModal}
        style={customStyles}
        contentLabel="Form event Modal"
      >
        <CalendarForm
          onSubmit={handleSubmitForm}
          onSubmitEdit={handleSubmitEditForm}
          onClose={handleCloseCalendarModal}
          eventToEdit={eventToEdit}
        />
      </Modal>

      <Modal
        ariaHideApp={false}
        isOpen={eventListModalIsOpen}
        onRequestClose={handleCloseEventListModal}
        style={customStyles}
        contentLabel="Event list Modal"
      >
        <EventList
          onEventEdit={handleEditEvent}
          events={eventListToModal}
          onSubmit={handleSubmitForm}
          onClose={handleCloseEventListModal}
        />
      </Modal>
    </Container>
  );
}

export default CalendarScreen;

const Container = styled.main`
  max-width: max-content;
  margin: 3rem auto 0 auto;
  padding: 1.5rem;
  background-color: #fff;
  border: 2px solid #bcccdc;
  border-radius: 8px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  height: fit-content;
`;
