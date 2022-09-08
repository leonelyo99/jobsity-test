import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "../../actions/events";
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
  const [eventListToModal, setEventListToModal] = useState();
  const events = useSelector((state) => state.events);

  const openCalendarModal = () => {
    setCalendarModalIsOpen(true);
  };

  const closeCalendarModal = () => {
    setCalendarModalIsOpen(false);
  };

  const handleOpenEventListModal = (events) => {
    setEventListToModal(events);
    setEventListModalIsOpen(true);
  };

  const closeEventListModal = () => {
    setEventListModalIsOpen(false);
  };

  const handleSubmitForm = (formValues) => {
    dispatch(setEvents(formValues));
  };

  return (
    <Container>
      <HeaderContainer>
        <Button onClick={openCalendarModal}>Add event</Button>
        <Event events={events} />
      </HeaderContainer>
      <CalendarComponent
        events={events}
        onOpenEventListModal={handleOpenEventListModal}
      />
      <Modal
        ariaHideApp={false}
        isOpen={calendarModalIsOpen}
        onRequestClose={closeCalendarModal}
        style={customStyles}
        contentLabel="Form event Modal"
      >
        <CalendarForm
          onSubmit={handleSubmitForm}
          onClose={closeCalendarModal}
        />
      </Modal>

      <Modal
        ariaHideApp={false}
        isOpen={eventListModalIsOpen}
        onRequestClose={closeEventListModal}
        style={customStyles}
        contentLabel="Event list Modal"
      >
        <EventList
          events={eventListToModal}
          onSubmit={handleSubmitForm}
          onClose={closeEventListModal}
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
