import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Event = () => {
  const events = useSelector((state) => state.events);
  const [eventsToShow, setEventsToShow] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const todayEvents = [];
    const todayDate = new Date().setHours(0, 0, 0, 0);
    for (let i = 0; i < events.length; i++) {
      if (events[i].date === todayDate) {
        const weather = await fetchCityWeather(events[i].city.key);
        todayEvents.push({ ...events[i], weather });
      }
    }
    setEventsToShow(todayEvents);
  }, [events]);

  const fetchCityWeather = async (cityKey) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=RWN8JtSdUhBGDeuew6Vyq5AnusYa3CLH`
      );
      if (response.ok) {
        const weather = await response.json();
        return weather.DailyForecasts[0];
      } else {
      }
    } catch {
      // TODO: add error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h3>Events this day: </h3>
      <ul>
        {!!eventsToShow.length ? (
          eventsToShow.map((event, index) => (
            <li>
              <h4 key={`${index}-${event.title}`}>{event.title}</h4>
            </li>
          ))
        ) : (
          <h4>You have no events this day</h4>
        )}
      </ul>
      {!!eventsToShow.length && (
        <>
          <h3>Weather for your events are: </h3>
          <ul>
            {eventsToShow.map((event, index) => {
              return (
                <li>
                  <h4 key={`${index}-cities`}>
                    {loading
                      ? "Loading..."
                      : `Max: ${event.weather.Temperature.Maximum.Value}${event.weather.Temperature.Maximum.Unit} Min: ${event.weather.Temperature.Minimum.Value}${event.weather.Temperature.Minimum.Unit}`}{" "}
                    in {event.city.name}
                  </h4>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 0px;
`;

export default Event;
