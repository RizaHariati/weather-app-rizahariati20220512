import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from "react";
import reducer from "./reducer";
import { CLOSE_SEARCH_BAR, OPEN_SEARCH_BAR } from "./reducerIndex";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    showSearchBar: true,
    locationKey: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [locationKey, setLocationKey] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [todaysWeather, setTodaysWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState([]);

  const closeSearchBar = () => {
    return dispatch({ type: CLOSE_SEARCH_BAR });
  };
  const openSearchBar = () => {
    return dispatch({ type: OPEN_SEARCH_BAR });
  };

  const fetchLocation = async (locationKey) => {
    try {
      const resp = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${locationKey}&limit=5&appid=${process.env.API_KEY}`
      );
      const data = await resp.json();
      setLocationList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMount = true;
    if (locationKey && isMount) {
      fetchLocation(locationKey);
    }
    return () => {
      return (isMount = false);
    };
  }, [locationKey]);

  const getLocationKey = (text) => {
    return setLocationKey(text);
  };

  const clearList = () => {
    setLocationList([]);
    setLocationKey("");
    return;
  };

  const getSelectedLocation = (item) => {
    setSelectedLocation(item);
    clearList();
  };

  const getTime = (dt) => {
    const now = new Date(dt * 1000);
    return now.toString().slice(16, 21);
  };
  const getDay = (dt) => {
    const now = new Date(dt * 1000);
    return now.toString().slice(0, 4) + now.toString().slice(8, 10);
  };

  const fetchTodaysWeather = async (location) => {
    const { lat, lon, name, state, country } = location;
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`
      );
      const data = await resp.json();
      if (data) {
        const { current, hourly, daily } = data;
        console.log(data);
        const today = daily[0];
        console.log(today);
        const weather = {
          name,
          state,
          country,
          weatherMain: current.weather[0].main,
          weatherDescription: current.weather[0].description,
          weatherIcon: current.weather[0].icon,
          temp: Math.floor(current.temp),
          tempMax: Math.floor(today.temp.max),
          tempMin: Math.floor(today.temp.min),
          timeNow: getTime(current.dt),
          morning: {
            temp: Math.floor(hourly[0].temp),
            humid: hourly[0].humidity,
            image: hourly[0].weather[0].icon,
          },
          afternoon: {
            temp: Math.floor(hourly[6].temp),
            humid: hourly[6].humidity,
            image: hourly[6].weather[0].icon,
          },
          evening: {
            temp: Math.floor(hourly[12].temp),
            humid: hourly[12].humidity,
            image: hourly[12].weather[0].icon,
          },
          overnight: {
            temp: Math.floor(hourly[18].temp),
            humid: hourly[18].humidity,
            image: hourly[18].weather[0].icon,
          },
        };
        daily.forEach((item, index) => {
          const {
            dt,
            temp,
            humidity,
            moonrise,
            moonset,
            sunrise,
            sunset,
            weather,
            wind_speed,
            uvi,
            rain,
          } = item;
          const { main, description, icon } = weather[0];
          const { day, eve, max, min, morn, night } = temp;

          const dailyData = {
            day: getDay(dt),
            tempDay: Math.floor(day),
            tempMax: Math.floor(max),
            tempMin: Math.floor(min),
            tempNight: Math.floor(night),
            dailyMain: main,
            dailyDescription: description,
            dailyIcon: icon,
            humidity,
            moonrise: getTime(moonrise),
            moonset: getTime(moonset),
            sunrise: getTime(sunrise),
            sunset: getTime(sunset),
            wind_speed,
            uvi,
            rain: Math.floor(rain),
          };
          if (!dailyWeather) {
            return setDailyWeather(new Array(dailyData));
          } else {
            return setDailyWeather((prevDaily) => [...prevDaily, dailyData]);
          }
        });
        clearList();
        setTodaysWeather(weather);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMount = true;
    setLoading(true);

    if (selectedLocation && isMount) {
      fetchTodaysWeather(selectedLocation);
    }

    return () => {
      isMount = false;
    };
  }, [selectedLocation]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        closeSearchBar,
        openSearchBar,
        locationKey,
        getLocationKey,
        clearList,
        locationList,
        setLocationList,
        selectedLocation,
        getSelectedLocation,
        todaysWeather,
        loading,
        dailyWeather,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider, useGlobalContext };
