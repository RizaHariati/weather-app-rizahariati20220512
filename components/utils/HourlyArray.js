const hourlyVar = (dt) => {
  const now = new Date(dt * 1000);
  const timeString = now.toString().slice(16, 19);
  const time = parseInt(timeString);

  return 24 - time;
};

const getHourly = (hourly, num) => {
  return {
    temp: Math.floor(hourly[num].temp),
    humid: hourly[num].humidity,
    image: hourly[num].weather[0].icon,
  };
};

const hourlyArray = (hourly, current) => {
  let arr = [];

  for (let i = 0; i < 24; i += 6) {
    const time = hourlyVar(current.dt);
    const data = getHourly(hourly, time + i);
    arr.push(data);
  }
  const b = arr.slice(0, 1);
  arr.splice(0, 1);
  arr.push(b[0]);
  return arr;
};

export default hourlyArray;
