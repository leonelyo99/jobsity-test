import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Event = () => {
  const events = useSelector((state) => state.events);
  const [eventsToShow, setEventsToShow] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const todayEvents = [];
      const todayDate = new Date().setHours(0, 0, 0, 0);

      for (let i = 0; i < events.length; i++) {
        if (events[i].date === todayDate) {
          const weather = await getCityWeather(events[i].city.key);
          todayEvents.push({ ...events[i], weather });
        }
      }
      setEventsToShow(todayEvents);
    };
    fetchData();
  }, [events]);

  const getCityWeather = async (cityKey) => {
    setLoading(true);
    setWeatherError(null);
    try {
      const response = await fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=${process.env.REACT_APP_API_KEY}`
      );
      if (response.ok) {
        const weather = await response.json();
        return weather.DailyForecasts[0];
      } else {
        setWeatherError("Something happened, please try again later");
      }
    } catch {
      setWeatherError("Something happened, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Events today: </h3>
      <ul>
        {!!eventsToShow.length ? (
          eventsToShow.map((event, index) => (
            <li key={`${index}-event`}>
              <h4 key={`${index}-${event.title}`}>{event.title}</h4>
            </li>
          ))
        ) : (
          <h4>You have no events this day</h4>
        )}
      </ul>
      {!!eventsToShow.length && !weatherError ? (
        <>
          <h3>Weather for your events are: </h3>
          <ul>
            {eventsToShow.map((event, index) => (
              <li key={`${index}-cities`}>
                <h4>
                  {loading
                    ? "Loading..."
                    : `Max: ${event.weather.Temperature.Maximum.Value}${event.weather.Temperature.Maximum.Unit} Min: ${event.weather.Temperature.Minimum.Value}${event.weather.Temperature.Minimum.Unit}`}{" "}
                  in {event.city.name}
                </h4>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h4>{weatherError}</h4>
      )}
    </div>
  );
};

export default Event;
