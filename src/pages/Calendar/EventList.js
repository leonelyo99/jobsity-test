import styled from "styled-components";

const EventList = ({ events, onClose }) => {
  return (
    <Container>
      <h3>Events this day: </h3>
      <ul>
        {events.map((event, index) => {
          return (
            <li>
              <h4 key={`${index}-${event.title}`}>{event.title}</h4>
            </li>
          );
        })}
      </ul>
      <ButtonContainer>
        <Button onClick={onClose}>Close Modal</Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 0px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const Button = styled.button`
  margin-left: 10px;
  margin-top: 10px;
`;

export default EventList;
