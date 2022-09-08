import React, { useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import { useDispatch, useSelector } from "react-redux";
import CalendarForm from "./CalendarForm";
import CalendarComponent from "./CalendarComponent";
import { setEvents } from "../../actions/events";

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

function Calendar(props) {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const events = useSelector((state) => state.events);

  useEffect(() => {
    console.log(events);
  }, [events]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmitForm = (formValues) => {
    dispatch(setEvents(formValues));
  };

  return (
    <Container>
      <button onClick={openModal}>Add event</button>
      <CalendarComponent events={events} />
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <CalendarForm onSubmit={handleSubmitForm} onClose={closeModal} />
      </Modal>
    </Container>
  );
}

export default Calendar;

const Container = styled.main`
  max-width: max-content;
  margin: 3rem auto 0 auto;
  padding: 1.5rem;
  background-color: #fff;
  border: 2px solid #bcccdc;
  border-radius: 8px;
`;
