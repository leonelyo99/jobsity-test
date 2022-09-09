import styled from "styled-components";

import EditIcon from "../../assets/icons/pencil-solid.svg";
import Button from "../../components/Button";

const EventList = ({ events, onClose, onEventEdit }) => {
  return (
    <Container>
      <h3>Events this day: </h3>
      <ul>
        {events.map((event, index) => (
          <li key={`${index}-${event.title}`}>
            <h4>{event.title}</h4>
            <EditButton
              src={EditIcon}
              role="button"
              onClick={() => {
                onEventEdit(event);
                onClose();
              }}
            />
          </li>
        ))}
      </ul>
      <ButtonContainer>
        <Button onClick={onClose}>Close Modal</Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  & li {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  & li {
    display: flex;
    justify-content: space-between;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const EditButton = styled.img`
  width: 11px;
  cursor: pointer;
  margin-top: 0px;
  margin-left: 4px;
`;
export default EventList;
