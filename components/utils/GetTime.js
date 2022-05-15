const getTime = (dt) => {
  const now = new Date(dt * 1000);
  return now.toString().slice(16, 21);
};

export default getTime;
