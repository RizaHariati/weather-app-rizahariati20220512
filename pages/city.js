import React, { useEffect } from "react";
import LocationOnMap from "../components/LocationOnMap";
import { useGlobalContext } from "../context/appContext";
import Router from "next/router";
import Image from "next/image";

const City = () => {
  const { clearList, todaysWeather, selectedLocation } = useGlobalContext();

  if (todaysWeather) {
    return (
      <div
        className="main-container "
        onClick={() => {
          clearList();
        }}
      >
        <div className="main-grid">
          <div className="flex flex-col w-full space-y-3">
            <Today todaysWeather={todaysWeather} />
            <TimeToday todaysWeather={todaysWeather} />
            <div className="grid-large relative h-fit p-0 pt-10 overflow-hidden">
              <h2 className=" absolute top-2 left-2 z-10 font-bold text-xl ">
                Your Location
              </h2>
              {selectedLocation && (
                <LocationOnMap selectedLocation={selectedLocation} />
              )}
            </div>
            <TopStory />
          </div>
          <div className="flex flex-col w-full space-y-4">
            <Hurricane />
            <Donate />
            <Hurricane />
          </div>
        </div>
      </div>
    );
  } else {
    setTimeout(() => {
      Router.push("/");
    }, 2000);
    return (
      <div
        onClick={() => {
          clearList();
        }}
        className="main-container"
        style={{ height: "88vh" }}
      >
        <h1 className="text-4xl font-semibold">Loading</h1>
      </div>
    );
  }
};

export default City;

const Today = ({ todaysWeather }) => {
  const {
    name,
    state,
    country,
    timeNow,
    temp,
    weatherMain,
    weatherIcon,
    tempMax,
    tempMin,
    weatherDescription,
  } = todaysWeather;
  return (
    <div className="grid-large text-left items-center justify-between text-white bg-gradient-to-b from-clrPrimaryMedium to-clrAccentDark">
      <h2 className=" font-bold text-xl ">
        {`${name}, ${state || ""}, ${country}`}
      </h2>
      <p className="text-clrAccentLight">{`as of ${timeNow} WIB`}</p>
      <div
        style={{ display: "grid", gridTemplateColumns: "3.5fr 1fr" }}
        className="items-center"
      >
        <div>
          <h1 className="text-7xl font-bold font-sans">{temp} &#8451;</h1>
          <h4 className="text-2xl font-bold">{weatherMain}</h4>
        </div>
        <div>
          <div className="flex-row items-center justify-center">
            <Image
              src={`http://openweathermap.org/img/w/${weatherIcon}.png`}
              alt={weatherMain}
              width={130}
              height={130}
              className="mx-auto mix-blend-screen"
            />
            <p className="font-bold text-xl font-sans text-center">
              {tempMax} &#8451; /{tempMin} &#8451;
            </p>
          </div>
        </div>
      </div>
      <p>{weatherDescription}</p>
    </div>
  );
};

const TimeToday = ({ todaysWeather }) => {
  const { timeInDay, name, state, country } = todaysWeather;
  return (
    <div className="grid-large space-y-5">
      <h2 className=" font-bold text-xl ">
        Tomorrow&#39;s Forecast for
        {`${name}, ${state || ""}, ${country}`}
      </h2>

      <div className="grid grid-cols-4 space-x-1 bg-gray-200 w-full ">
        {timeInDay.map((time, index) => {
          let now = "";
          if (index === 0) {
            now = "Morning";
          } else if (index === 1) {
            now = "Evening";
          } else if (index === 2) {
            now = "Night";
          } else {
            now = "Overnight";
          }
          return (
            <Time
              time={now}
              temp={time.temp}
              humid={time.humid || null}
              weather={time.image}
              id={index}
              key={index}
            />
          );
        })}
      </div>
      <button className="btn ">next hours</button>
    </div>
  );
};

const Time = ({ time, temp, humid, weather, id }) => {
  return (
    <div className="bg-white flex flex-col items-center justify-center space-y-2">
      <p className="text-xl font-medium capitalize">{time}</p>
      <h2 className="font-sans ">{temp} &#8451;</h2>
      <Image
        src={`http://openweathermap.org/img/w/${weather}.png`}
        alt={`weather ${id}`}
        width={80}
        height={80}
        className="mx-auto"
      />

      <h2>{humid} %</h2>
    </div>
  );
};

const TopStory = () => {
  return (
    <div className="grid-large space-y-5">
      <h2 className=" font-bold text-xl ">Top Story</h2>
      <div className="grid grid-cols-4 space-x-3 w-full ">
        <div className=" h-52 rounded-md overflow-hidden shadow-sm bg-slate-500 z-10">
          <Image
            className="h-full object-cover object-center"
            src="/additional/weather1.jpg"
            alt="weather1"
            layout="responsive"
            width={160}
            height={260}
          />
        </div>
        <div className=" h-52 rounded-md overflow-hidden shadow-sm bg-slate-500 z-10">
          <Image
            className="h-full object-cover object-center"
            src="/additional/weather2.jpg"
            alt="weather2"
            layout="responsive"
            width={160}
            height={260}
          />
        </div>
        <div className="h-52 rounded-md overflow-hidden shadow-sm bg-slate-500 z-10">
          <Image
            className=" h-full object-cover object-center"
            src="/additional/weather3.jpg"
            alt="weather3"
            layout="responsive"
            width={160}
            height={260}
          />
        </div>
        <div className="h-52 rounded-md overflow-hidden shadow-sm bg-slate-500 z-10">
          <Image
            className="w-fit h-full object-cover object-center"
            src="/additional/weather4.jpg"
            alt="weather4"
            layout="responsive"
            width={160}
            height={260}
          />
        </div>
      </div>
      <button className="btn ">see more</button>
    </div>
  );
};

const Hurricane = () => {
  return (
    <div className="grid-small">
      <h2 className=" font-bold text-xl px-5">Hurricane Central</h2>
      <div className=" relative w-full h-96">
        <Image
          className=" absolute h-full w-full object-cover object-center "
          src="/additional/hurricane.jpg"
          alt="hurricane"
          layout="responsive"
          width={270}
          height={300}
        />
        <div className="absolute top-5 left-5 w-52 flex-row">
          <h2 className=" font-bold text-xl text-white">
            Post-Tropical Cyclone Isaias
          </h2>
          <p className="text-white">aug 5, 4:00 pm</p>
        </div>
        <div className="absolute bottom-5 left-5 grid grid-cols-3 ">
          <div>
            <p className="text-white text-sm">Max Winds</p>
            <h2 className=" font-semibold text-md text-white">40 mph</h2>
          </div>
          <div>
            <p className="text-white text-sm">Movement</p>
            <h2 className=" font-semibold text-md text-white">NNE at 28 mph</h2>
          </div>
          <div>
            <p className="text-white text-sm">Pressure</p>
            <h2 className=" font-semibold text-md text-white">1000 mb</h2>
          </div>
        </div>
      </div>

      <button className="btn ml-5">track storm</button>
    </div>
  );
};

const Donate = () => {
  return (
    <div className="grid-small p-5">
      <h2 className=" font-bold text-xl ">Donate to The Red Cross</h2>
      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}>
        <p>Help people affected by Tropical disease</p>
        <Image
          src="/additional/red-cross.png"
          alt="red cross"
          width={48}
          height={48}
        />
      </div>
      <button className="btn ">Donate Now</button>
    </div>
  );
};
