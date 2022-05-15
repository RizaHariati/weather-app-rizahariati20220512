import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from "react";
import getDay from "../components/utils/GetDay";
import getTime from "../components/utils/GetTime";
import hourlyArray from "../components/utils/HourlyArray";
import reducer from "./reducer";
import {
  CLOSE_SEARCH_BAR,
  GET_TODAYS_WEATHER,
  OPEN_SEARCH_BAR,
} from "./reducerIndex";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    showSearchBar: true,
    locationKey: "",
    todaysWeather: null,
    // dailyWeather: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [locationKey, setLocationKey] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  // const [todaysWeather, setTodaysWeather] = useState(null);
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
        `https://api.openweathermap.org/geo/1.0/direct?q=${locationKey}&limit=5&appid=${process.env.API_KEY}`
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

  const fetchTodaysWeather = async (location) => {
    const { lat, lon, name, state, country } = location;
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`
      );
      const data = await resp.json();
      if (data) {
        const { current, hourly, daily } = data;
        const today = daily[0];
        const time = hourlyArray(hourly, current);
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
          timeInDay: time,
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
          const { day, max, min, night } = temp;

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
        dispatch({ type: GET_TODAYS_WEATHER, payload: weather });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMount = true;

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
