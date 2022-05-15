import getDay from "./GetDay";
import getTime from "./GetTime";

const getDailyData = (daily) => {
  let arr = [];
  daily.forEach((item) => {
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
    arr.push(dailyData);
  });
  return arr;
};

export default getDailyData;
