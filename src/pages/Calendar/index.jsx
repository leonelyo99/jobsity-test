import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { editEvent, setEvents } from "../../actions/events";
import Button from "../../components/Button";
import CalendarComponent from "./Calendar";
import Event from "./Event";
import EventForm from "./EventForm";
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

function CalendarScreen() {
  const dispatch = useDispatch();
  const [eventListModalIsOpen, setEventListModalIsOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [eventFormModalIsOpen, setEventFormModalIsOpen] = useState(false);
  const [eventListModal, setEventListModal] = useState();
  const events = useSelector((state) => state.events);

  const handleOpenEventFormModal = () => {
    setEventFormModalIsOpen(true);
  };

  const handleCloseEventFormModal = () => {
    !!eventToEdit && setEventToEdit(null);
    setEventFormModalIsOpen(false);
  };

  const handleOpenEventListModal = (events) => {
    setEventListModal(events);
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
    setEventToEdit(event);
    handleOpenEventFormModal();
  };

  return (
    <Container>
      <HeaderContainer>
        <Button onClick={handleOpenEventFormModal}>Add event</Button>
        <Event events={events} />
      </HeaderContainer>
      <CalendarComponent
        events={events}
        onEditEvent={handleEditEvent}
        onOpenEventListModal={handleOpenEventListModal}
      />
      <Modal
        ariaHideApp={false}
        isOpen={eventFormModalIsOpen}
        onRequestClose={handleCloseEventFormModal}
        style={customStyles}
        contentLabel="Form event Modal"
      >
        <EventForm
          onSubmit={handleSubmitForm}
          onSubmitEdit={handleSubmitEditForm}
          onClose={handleCloseEventFormModal}
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
          events={eventListModal}
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

  * {
    font-family: Inter, -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
      sans-serif;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
