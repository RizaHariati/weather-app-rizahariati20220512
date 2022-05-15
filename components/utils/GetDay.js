const getDay = (dt) => {
  const now = new Date(dt * 1000);
  return now.toString().slice(0, 4) + now.toString().slice(8, 10);
};

export default getDay;
