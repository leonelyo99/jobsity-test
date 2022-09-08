import styled from "styled-components";
import EditIcon from "../../assets/icons/pencil-solid.svg";

const EventList = ({ events, onClose, onEventEdit }) => {
  return (
    <Container>
      <h3>Events this day: </h3>
      <ul>
        {events.map((event, index) => {
          return (
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

  & li {
    display: flex;
    justify-content: space-between;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const Button = styled.button`
  margin-left: 10px;
  margin-top: 10px;
`;

const EditButton = styled.img`
  width: 11px;
  cursor: pointer;
  margin-top: 0px;
  margin-left: 4px;
`;
export default EventList;
